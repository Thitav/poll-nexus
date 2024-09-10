import { User } from "firebase/auth";
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
  runTransaction,
} from "firebase/firestore";

interface PollOption {
  id: string;
  name: string;
  votes: number;
}

export async function pollGetOptions(db: Firestore, pollId: string) {
  const pollOptions = await getDocs(collection(db, "polls", pollId, "options"));
  return pollOptions.docs.map((option) => {
    return { id: option.id, ...option.data() } as PollOption;
  });
}

export async function userHasVoted(db: Firestore, pollId: string, user: User) {
  const pollRef = doc(db, "polls", pollId);
  const poll = await getDoc(pollRef);
  if (!poll.exists()) {
    throw new Error("Poll does not exist");
  }

  const pollData = poll.data();
  if (!pollData) {
    throw new Error("Poll data does not exist");
  }

  const userVotesQuery = query(
    collection(db, "polls", pollId, "options"),
    where("votes", ">", 0),
    where("voters", "array-contains", user.uid),
  );
  const userVotes = await getDocs(userVotesQuery);

  return userVotes.docs.length > 0;
}

export async function pollVoteOption(
  db: Firestore,
  pollId: string,
  optionId: string,
  user: User,
) {
  const optionRef = doc(db, "polls", pollId, "options", optionId);
  const voteRef = doc(db, "users", user.uid, "votes", pollId);

  await runTransaction(db, async (transaction) => {
    const optionDoc = await transaction.get(optionRef);
    if (!optionDoc.exists()) {
      throw new Error("Option does not exist");
    }
    if ((await transaction.get(voteRef)).exists()) {
      throw new Error("User has already voted");
    }

    transaction.set(voteRef, { option: optionId });
    transaction.update(optionRef, { votes: increment(1) });
  });
}
