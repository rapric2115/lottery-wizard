// utils/visitCounter.js
import { getDatabase, ref, get, set } from 'firebase/database';

const VISIT_COUNT_REF = ref(getDatabase(), '/visitCount');

export const getVisitCount = async () => {
  try {
    const snapshot = await get(VISIT_COUNT_REF);
    return snapshot.val() || 0;
  } catch (error) {
    console.error('Error getting visit count:', error);
    return 0;
  }
};

export const incrementVisitCount = async () => {
  try {
    const currentCount = await getVisitCount();
    await set(VISIT_COUNT_REF, currentCount + 1);
  } catch (error) {
    console.error('Error incrementing visit count:', error);
  }
};


