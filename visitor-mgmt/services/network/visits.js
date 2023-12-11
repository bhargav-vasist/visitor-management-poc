import { collection, getDocs, query, where } from 'firebase/firestore';
import { startOfDay, startOfWeek, startOfMonth, isWithinInterval } from 'date-fns';
import { firestoreDB } from '../../firebaseConfig';

const countVisits = async () => {
    try {
        const counts = { day: 0, week: 0, month: 0 };
        const now = new Date();
        const startDay = startOfDay(now);
        const startWeek = startOfWeek(now);
        const startMonth = startOfMonth(now);

        // Fetch all visitors
        const visitorSnapshot = await getDocs(collection(firestoreDB, 'visitors'));

        for (const visitorDoc of visitorSnapshot.docs) {
            // Fetch visits for each visitor
            const visitsSnapshot = await getDocs(collection(firestoreDB, 'visitors', visitorDoc.id, 'visits'));

            for (const visitDoc of visitsSnapshot.docs) {
                const visitData = visitDoc.data();

                if (visitData.checkInTime) {
                    const checkInDate = visitData.checkInTime.toDate();

                    if (isWithinInterval(checkInDate, { start: startDay, end: now })) {
                        counts.day += 1;
                    }
                    if (isWithinInterval(checkInDate, { start: startWeek, end: now })) {
                        counts.week += 1;
                    }
                    if (isWithinInterval(checkInDate, { start: startMonth, end: now })) {
                        counts.month += 1;
                    }
                }
            }
        }

        return counts;
    } catch (error) {
        console.error('Error fetching visit data:', error);
        return { day: 0, week: 0, month: 0 };
    }
};

export default countVisits;
