'use client';

import { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Capsule } from '@/lib/types';
import { db } from '@/lib/firebase/firebase';
import type { User } from 'firebase/auth';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

export interface AppContextType {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
  capsules: Capsule[];
  activeTab: string;
  addCapsule: (data: Omit<Capsule, 'id' | 'createdAt' | 'isLocked'>) => Promise<void>;
  updateCapsule: (updatedCapsule: Partial<Capsule> & { id: string }) => Promise<void>;
  deleteCapsule: (id: string) => Promise<void>;
  setActiveTab: (tabId: string) => void;
  getStreak: () => number;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [capsules, setCapsules] = useState<Capsule[]>([]);

  const getCapsulesCollectionRef = useCallback(() => {
    return collection(db, 'capsules');
  }, []);

  const getStreak = useCallback(() => {
    // This is a placeholder as streak logic needs to be tied to user data in Firestore
    return 0;
  }, []);

  const fetchCapsules = useCallback(async () => {
    try {
      const capsulesCollectionRef = getCapsulesCollectionRef();
      const q = query(capsulesCollectionRef, orderBy('createdAt', 'desc'));
      const data = await getDocs(q);
      const now = new Date();
      const fetchedCapsules = data.docs.map((d) => {
        const docData = d.data();
        const capsule = {
          ...docData,
          id: d.id,
          unlockDate: (docData.unlockDate as Timestamp).toDate().toISOString(),
          createdAt: (docData.createdAt as Timestamp).toDate().toISOString(),
        } as Capsule;

        if (capsule.isLocked && new Date(capsule.unlockDate) <= now) {
          updateDoc(doc(db, 'capsules', capsule.id), { isLocked: false });
          return { ...capsule, isLocked: false };
        }
        return capsule;
      });
      setCapsules(fetchedCapsules);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error fetching capsules: ', error);
      setCapsules([]);
      setIsAuthenticated(false);
    } finally {
      setIsInitialized(true);
    }
  }, [getCapsulesCollectionRef]);

  useEffect(() => {
    fetchCapsules();
  }, [fetchCapsules]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const capsulesToUpdate: string[] = [];
      
      const updatedLocalCapsules = capsules.map(c => {
        if (c.isLocked && new Date(c.unlockDate) <= now) {
          capsulesToUpdate.push(c.id);
          return { ...c, isLocked: false };
        }
        return c;
      });

      if (capsulesToUpdate.length > 0) {
        setCapsules(updatedLocalCapsules);
        capsulesToUpdate.forEach(id => {
          const capsuleDoc = doc(db, 'capsules', id);
          updateDoc(capsuleDoc, { isLocked: false });
        });
      }
    }, 1000 * 30);

    return () => clearInterval(interval);
  }, [capsules]);

  const addCapsule = async (data: Omit<Capsule, 'id' | 'createdAt' | 'isLocked'>) => {
    const now = new Date();
    const newCapsuleData = {
      ...data,
      createdAt: serverTimestamp(),
      unlockDate: new Date(data.unlockDate),
      isLocked: new Date(data.unlockDate) > now,
    };
    try {
      const capsulesCollectionRef = getCapsulesCollectionRef();
      const docRef = await addDoc(capsulesCollectionRef, newCapsuleData);
      const newCapsule: Capsule = {
        ...data,
        id: docRef.id,
        createdAt: now.toISOString(),
        isLocked: newCapsuleData.isLocked,
      };
      setCapsules((s) => [newCapsule, ...s].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (error) {
      console.error('Error adding capsule: ', error);
    }
  };

  const updateCapsule = async (updatedCapsule: Partial<Capsule> & { id: string }) => {
    const capsuleDoc = doc(db, 'capsules', updatedCapsule.id);
    try {
      await updateDoc(capsuleDoc, updatedCapsule);
      setCapsules((s) =>
        s.map((c) =>
          c.id === updatedCapsule.id ? { ...c, ...updatedCapsule } : c
        )
      );
    } catch (error) {
      console.error('Error updating capsule: ', error);
    }
  };

  const deleteCapsule = async (id: string) => {
    const capsuleDoc = doc(db, 'capsules', id);
    try {
      await deleteDoc(capsuleDoc);
      setCapsules((s) => s.filter((c) => c.id !== id));
    } catch (error) {
      console.error('Error deleting capsule: ', error);
    }
  };

  const value: AppContextType = {
    isInitialized,
    isAuthenticated,
    user: null,
    capsules,
    activeTab,
    addCapsule,
    updateCapsule,
    deleteCapsule,
    setActiveTab,
    getStreak,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
