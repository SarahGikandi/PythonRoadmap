import { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
    doc,
    setDoc,
    onSnapshot,
    collection,
    addDoc,
    serverTimestamp
} from 'firebase/firestore';

export const useFocusTracker = (userId) => {
    const [profile, setProfile] = useState({ currentWeek: 1 });
    const [progress, setProgress] = useState({}); // { week1: { day1: {...} }, ... }
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        // 1. Sync Profile
        const profileRef = doc(db, 'users', userId, 'profile', 'data');
        const unsubProfile = onSnapshot(profileRef, (docSnap) => {
            if (docSnap.exists()) {
                setProfile(docSnap.data());
            } else {
                setDoc(profileRef, { currentWeek: 1 }, { merge: true });
            }
        });

        // 2. Sync Progress (Real-time for all weeks)
        const progressColRef = collection(db, 'users', userId, 'progress');
        const unsubProgress = onSnapshot(progressColRef, (querySnapshot) => {
            const allProgress = {};
            querySnapshot.forEach((doc) => {
                allProgress[doc.id] = doc.data();
            });
            setProgress(allProgress);
            setLoading(false);
        });

        return () => {
            unsubProfile();
            unsubProgress();
        };
    }, [userId]);

    const updateProgress = async (week, day, data) => {
        // Structure: users/{userId}/progress/week{N}/day{M}
        const weekRef = doc(db, 'users', userId, 'progress', `week${week}`);
        await setDoc(weekRef, {
            [`day${day}`]: {
                ...data,
                updatedAt: serverTimestamp()
            }
        }, { merge: true });
    };

    const saveAntiJumpAttempt = async (message) => {
        const attemptsRef = collection(db, 'users', userId, 'antiJumpAttempts');
        await addDoc(attemptsRef, {
            message,
            timestamp: serverTimestamp()
        });
    };

    const saveDailyLog = async (date, log) => {
        // Structure: users/{userId}/dailyLogs/YYYY-MM-DD
        const logRef = doc(db, 'users', userId, 'dailyLogs', date);
        await setDoc(logRef, {
            ...log,
            updatedAt: serverTimestamp()
        }, { merge: true });
    };

    return { profile, progress, loading, updateProgress, saveAntiJumpAttempt, saveDailyLog };
};
