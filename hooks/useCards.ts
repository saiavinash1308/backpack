import api from "@/api/api";
import { useEffect, useState } from "react";

interface Slot {
  slotId: string;
  start: number;
  end: number;
  total: number;
  _count: {
        purchases: number
  }
}

interface Card {
  cardId: string;
  cardName: string;
  slots: Slot[];
}

interface CardResponse {
  success: boolean;
  cards?: Card[];
  message?: string;
}

export const useCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true); // ✅ Ensure loading is true initially
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await api.get<CardResponse>("/api/cards/fetchcards");
        const data = res.data;

        if (data.success) {
          setCards((prev) => (prev.length ? prev : [...(data.cards ?? [])]));
        }
      } catch (error) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  return { loading, cards, error };
};
