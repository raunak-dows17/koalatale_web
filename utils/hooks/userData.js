"use client";

import { UserData } from "../apis/usersData";
const { useState, useEffect } = require("react");

export function usePersonalData() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    UserData.getPersonalInfo()
      .then((data) => setUserData(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { userData, error, loading };
}

export function userDetail(username) {
  const [usersData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    UserData.getUsersData(username)
      .then((data) => setUserData(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return { usersData, error, loading };
}
