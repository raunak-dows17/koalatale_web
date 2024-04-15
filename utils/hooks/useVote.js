"use client";

import { useEffect, useState } from "react";
import { VoteACon } from "../apis/vote";

export const useVotes = () => {
  const [vote, setVote] = useState(null);
  const [error, setError] = useState(null);

  function handleVote(_id) {
    VoteACon(_id)
      .then((data) => {
        setVote(data);
      })
      .catch((err) => setError(err));
  }

  return { vote, error, handleVote };
};
