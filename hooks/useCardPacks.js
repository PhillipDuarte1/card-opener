import { useEffect, useState } from 'react';
import { auth, db } from '../utils/firebase';

const useCardPacks = () => {
    const [packs, setPacks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                db.ref(`users/${user.uid}/collection`).on('value', (snapshot) => {
                    if (snapshot.val() != null) {
                        const userPacks = snapshot.val();
                        const packArray = Object.entries(userPacks);
                        setPacks(packArray);
                    } else {
                        setPacks([]);
                    }
                    setLoading(false);
                });
            } else {
                setPacks([]);
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    return { packs, loading };
};

export default useCardPacks;