import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

interface PollOption {
  id: string;
  name: string;
  votes: number;
}

export async function getPollOptions(db: Firestore, pollId: string) {
  const pollOptions = await getDocs(collection(db, "polls", pollId, "options"));
  return pollOptions.docs.map((option) => {
    return { id: option.id, ...option.data() } as PollOption;
  });
}

export async function votePollOption(
  db: Firestore,
  pollId: string,
  optionId: string,
) {
  const optionRef = doc(db, "polls", pollId, "options", optionId);
  const option = await getDoc(optionRef);
  if (!option.exists()) {
    throw new Error("Option does not exist");
  }

  await updateDoc(optionRef, { votes: increment(1) });
}
