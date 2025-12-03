import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { MessageCircle, Search, Send, X } from "lucide-react";

type QAItem = {
  id: string;
  question: string;
  answer: string;
  href?: string;
};

const DEFAULT_QA: QAItem[] = [
  {
    id: "top-destinations",
    question: "What are Sri Lanka's top destinations?",
    answer:
      "Explore Ella, Galle Fort, Mirissa Beach, Kandy Temple, Yala National Park, and Nuwara Eliya. Each offers unique experiences from tea plantations and scenic trains to beaches, heritage, and wildlife.",
    href: "#destinations",
  },
  {
    id: "tours",
    question: "Do you have curated tour packages?",
    answer:
      "Yes. Choose from Cultural Heritage, Beach & Coast Adventure, Wildlife Safari, and Hill Country Explorer with clear durations, highlights, and pricing.",
    href: "#tours",
  },
  {
    id: "hotels",
    question: "What types of hotels can I book?",
    answer:
      "From luxury resorts in Colombo to boutique beach villas in Mirissa, heritage stays in Kandy, mountain lodges in Ella, safari camps in Yala, and colonial mansions in Galle.",
    href: "#hotels",
  },
  {
    id: "plan",
    question: "How do I plan my trip?",
    answer:
      "Use the Plan Your Trip page to get started. You can also explore destinations and tours first, then proceed to planning.",
    href: "/plan",
  },
  {
    id: "about",
    question: "Why choose Serranid Journeys?",
    answer:
      "15+ years experience, 10,000+ happy travelers, 50+ destinations, and a 98% satisfaction rate. We focus on authentic, sustainable, and expertly guided experiences.",
    href: "#about",
  },
  {
    id: "contact",
    question: "How can I contact you?",
    answer:
      "Scroll to the Contact section for ways to reach us and start your journey.",
    href: "#contact",
  },
];

type Message = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [suggested, setSuggested] = useState<QAItem[]>(DEFAULT_QA);
  const bottomRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return suggested;
    const q = query.toLowerCase();
    return suggested.filter((i) =>
      i.question.toLowerCase().includes(q) || i.answer.toLowerCase().includes(q)
    );
  }, [query, suggested]);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          text: "Hi there 👋\nWelcome to Serranid Journeys!\nHow can I help you today?",
        },
      ]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, open]);

  const handleSend = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", text: trimmed }]);
    setQuery("");
    // Simple retrieval from default Q&A
    const found = DEFAULT_QA.find(
      (i) =>
        i.question.toLowerCase().includes(trimmed.toLowerCase()) ||
        trimmed.toLowerCase().includes(i.question.toLowerCase())
    );
    const answer = found
      ? `${found.answer}${found.href ? `\n\nLearn more: ${found.href}` : ""}`
      : "I matched your question to our content. Try tapping a suggested question below or explore Destinations, Tours, and Hotels sections.";
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "assistant", text: answer },
    ]);
  };

  const onSelect = (item: QAItem) => {
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", text: item.question },
      { id: crypto.randomUUID(), role: "assistant", text: item.answer + (item.href ? `\n\nLearn more: ${item.href}` : "") },
    ]);
  };

  const renderTextWithLinks = (text: string) => {
    // Linkify http(s) URLs, app routes starting with /, and hash anchors like #destinations
    const tokenRegex = /(https?:\/\/[^\s]+|\/[\w\-\/\?=&#]+|#[\w\-]+)/g;
    const parts = text.split(tokenRegex);
    return parts.map((part, idx) => {
      if (/^(https?:\/\/|\/|#)/.test(part)) {
        return (
          <a
            key={idx}
            href={part}
            onClick={() => setOpen(false)}
            className="underline decoration-from-font text-primary hover:opacity-90"
          >
            {part}
          </a>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <>
      {/* Floating trigger button */}
      <div className="fixed right-4 bottom-4 z-50">
        <div className="relative">
          <Button
            aria-label="Open travel assistant"
            className="rounded-full h-14 w-14 p-0 shadow-xl bg-pink-600 hover:bg-pink-500"
            onClick={() => setOpen((v) => !v)}
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </Button>
          {!open && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-amber-400 ring-2 ring-white" />
          )}
        </div>
      </div>

      {/* Chat window */}
      {open && (
        <div
          role="dialog"
          aria-label="Virtual Assistant"
          className="fixed bottom-24 sm:bottom-24 right-4 z-50 w-[78vw] max-w-[78vw] sm:w-[90vw] sm:max-w-sm bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/50">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-pink-600 flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div className="text-sm font-semibold">Virtual Assistant</div>
            </div>
            <Button variant="ghost" size="icon" aria-label="Close" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="h-[60vh] sm:h-72">
            <ScrollArea className="h-full p-4">
              <div className="space-y-3">
                {messages.map((m) => (
                  <div key={m.id} className={`flex ${m.role === "assistant" ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm ${
                        m.role === "assistant" ? "bg-muted" : "bg-pink-600 text-white"
                      }`}
                    >
                      {m.text.split("\n").map((line, idx) => (
                        <div key={idx}>{renderTextWithLinks(line)}</div>
                      ))}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
            </ScrollArea>
          </div>

          {/* Suggested questions */}
          <div className="px-4 pt-2">
            <div className="text-xs text-muted-foreground mb-2">Suggestions</div>
            <div className="flex flex-wrap gap-2 pb-2">
              {filtered.slice(0, 6).map((item) => (
                <Button
                  key={item.id}
                  variant="outline"
                  size="sm"
                  onClick={() => onSelect(item)}
                  className="rounded-full"
                >
                  {item.question}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 p-3 border-t">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend(query);
                }}
                placeholder="Write your message..."
                className="pl-9"
              />
            </div>
            <Button aria-label="Send" className="bg-pink-600 hover:bg-pink-500" onClick={() => handleSend(query)}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;


