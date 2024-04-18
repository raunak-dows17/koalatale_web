"use client";

import { useEffect, useState } from "react";
import { StoryData } from "../apis/story";

export function useStories() {
  const [stories, setStories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    StoryData.stories()
      .then((data) => setStories(data?.stories))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { stories, loading, error };
}

export function useStory(id) {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    StoryData.getStoryById(id)
      .then((data) => setStory(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  const fetchAgain = () => {
    setLoading(true);
    StoryData.getStoryById(id)
      .then((data) => setStory(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  };

  return { story, loading, error, fetchAgain };
}
