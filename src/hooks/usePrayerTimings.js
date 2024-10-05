import { useState, useEffect, useRef } from "react";
import axios from "axios";
import moment from "moment";
import "moment/locale/fr"; // Importation de la localisation française

moment.locale("fr");

export default function usePrayerTimings() {
  // États pour la wilaya (ville) et les horaires
  const [wilaya, setWilaya] = useState("Bejaia");
  const [timings, setTimings] = useState({
    Fajr: "05:10",
    Dhuhr: "12:29",
    Asr: "15:49",
    Maghrib: "18:21",
    Isha: "19:42",
  });
  let interval = 1000;

  // États pour le temps actuel, le temps restant et la prochaine prière
  const [currentTime, setCurrentTime] = useState(moment);
  const [leftTime, setLeftTime] = useState("");
  const [nextPrayer, setNextPrayer] = useState("");

  const timeToSeconds = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60;
  };

  const prayersInSeconds = {
    Fajr: timeToSeconds(timings.Fajr),
    Dhuhr: timeToSeconds(timings.Dhuhr),
    Asr: timeToSeconds(timings.Asr),
    Maghrib: timeToSeconds(timings.Maghrib),
    Isha: timeToSeconds(timings.Isha),
  };
  const calculateRemainingTime = () => {
    let nextPrayerName = null;
    let shortestTime = Infinity;

    const currentSeconds =
      moment().hour() * 3600 + moment().minute() * 60 + moment().second();

    Object.entries(prayersInSeconds).forEach(
      ([prayerName, prayerTimeInSeconds]) => {
        let remainingSeconds = prayerTimeInSeconds - currentSeconds;
        if (remainingSeconds < 0) {
          remainingSeconds += 86400;
        }
        if (remainingSeconds < shortestTime) {
          shortestTime = remainingSeconds;
          nextPrayerName = prayerName;
        }
      }
    );

    const leftHour = Math.floor(shortestTime / 3600);
    const leftMinute = Math.floor((shortestTime % 3600) / 60);
    const leftSeconds = Math.floor((shortestTime % 3600) % 60);

    setNextPrayer(nextPrayerName);
    setLeftTime(
      `${formatTime(leftHour)}:${formatTime(leftMinute)}:${formatTime(
        leftSeconds
      )}`
    ); // Mettre à jour le temps restant
  };

  // Formatage des heures et minutes pour qu'elles aient toujours 2 chiffres
  const formatTime = (value) => (value < 10 ? `0${value}` : value);

  // Fonction pour récupérer les horaires de prière via une API en fonction de la ville
  const getData = async (city) => {
    try {
      const response = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity?country=DZ&city=${city}`
      );
      setTimings(response.data.data.timings);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };
  useEffect(() => {
    getData(wilaya);
  }, [wilaya]);

  // useEffect pour calculer le temps restant à chaque seconde
  useEffect(() => {
    const interval = setInterval(() => {
      calculateRemainingTime();
    }, 1000);

    return () => clearInterval(interval); // Nettoyage de l'intervalle à la fin
  }, [currentTime, timings]);

  return {
    wilaya,
    setWilaya,
    timings,
    leftTime,
    nextPrayer,
  };
}
