
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  RotateCcw,
  Languages
} from "lucide-react";

import { assistantTranslations } from "../data/assistantTranslations";

const languageOptions = [
  { code: "en", label: "English" },
  { code: "zu", label: "isiZulu" },
  { code: "af", label: "Afrikaans" }
];

const topics = [
  {
    id: "aps",
    keywords: [
      "aps",
      "tpt",
      "admission point",
      "calculate",
      "bereken",
      "bala",
      "points",
      "punttelling"
    ],
    link: "/profile"
  },
  {
    id: "applications",
    keywords: [
      "apply",
      "application",
      "admission",
      "register",
      "deadline",
      "aansoek",
      "isicelo",
      "faka isicelo",
      "sluitingsdatum"
    ],
    link: "/universities"
  },
  {
    id: "eligibility",
    keywords: [
      "eligible",
      "eligibility",
      "qualify",
      "requirements",
      "borderline",
      "kwalifiseer",
      "vereistes",
      "izidingo",
      "ukwamukelwa"
    ],
    link: "/programmes"
  },
  {
    id: "saved",
    keywords: [
      "save",
      "saved",
      "bookmark",
      "favourite",
      "favorite",
      "stoor",
      "gestoorde",
      "gcina",
      "zigcina"
    ],
    link: "/programmes"
  },
  {
    id: "funding",
    keywords: [
      "bursary",
      "bursaries",
      "funding",
      "financial aid",
      "nsfas",
      "scholarship",
      "sponsorship",
      "beurs",
      "beurse",
      "finansiering",
      "imifundaze",
      "usizo lwezimali"
    ],
    externalLink: "https://www.nsfas.org.za/"
  },
  {
    id: "universities",
    keywords: [
      "university",
      "universities",
      "campus",
      "institution",
      "universiteit",
      "universiteite",
      "inyuvesi",
      "amanyuvesi"
    ],
    link: "/universities"
  },
  {
    id: "profile",
    keywords: [
      "profile",
      "marks",
      "subjects",
      "results",
      "profiel",
      "punte",
      "vakke",
      "amamaki",
      "izifundo"
    ],
    link: "/profile"
  },
  {
    id: "greeting",
    keywords: [
      "hello",
      "hi",
      "hey",
      "help",
      "hallo",
      "hulp",
      "sawubona",
      "usizo"
    ]
  }
];

const suggestedTopicIds = [
  "aps",
  "applications",
  "eligibility",
  "saved",
  "funding"
];

function findTopic(question) {
  const text = question.toLowerCase().trim();

  const bestMatch = topics
    .map((topic) => ({
      ...topic,
      score: topic.keywords.reduce(
        (score, keyword) =>
          score + (text.includes(keyword) ? 1 : 0),
        0
      )
    }))
    .sort((a, b) => b.score - a.score)[0];

  return bestMatch?.score > 0 ? bestMatch : null;
}

function getInitialLanguage() {
  try {
    const saved = localStorage.getItem(
      "uniConnectAssistantLanguage"
    );

    return assistantTranslations[saved] ? saved : "en";
  } catch {
    return "en";
  }
}

function StudentAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(getInitialLanguage);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const t = assistantTranslations[language];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });

      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  const changeLanguage = (newLanguage) => {
    if (!assistantTranslations[newLanguage]) return;

    setLanguage(newLanguage);
    setMessages([]);
    setInput("");

    try {
      localStorage.setItem(
        "uniConnectAssistantLanguage",
        newLanguage
      );
    } catch {
      // Language still works for this session.
    }
  };

  const sendMessage = (question, selectedTopicId = null) => {
    const cleanQuestion = question.trim();

    if (!cleanQuestion) return;

    const topic = selectedTopicId
      ? topics.find((item) => item.id === selectedTopicId)
      : findTopic(cleanQuestion);

    const answer = topic
      ? t.answers[topic.id]
      : { text: t.fallback };

    const userMessage = {
      id: crypto.randomUUID(),
      sender: "user",
      text: cleanQuestion
    };

    const assistantMessage = {
      id: crypto.randomUUID(),
      sender: "assistant",
      text: answer.text,
      link: topic?.link,
      externalLink: topic?.externalLink,
      linkText: answer.linkText
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
      assistantMessage
    ]);

    setInput("");
  };

  const resetChat = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <div className="student-assistant">
      {isOpen && (
        <div
          className="assistant-window"
          role="dialog"
          aria-label={t.title}
        >
          <div className="assistant-header">
            <div className="assistant-header-info">
              <div className="assistant-avatar">
                <Bot size={21} />
              </div>

              <div>
                <strong>{t.title}</strong>
                <span>{t.subtitle}</span>
              </div>
            </div>

            <div className="assistant-header-actions">
              <button
                type="button"
                onClick={resetChat}
                aria-label={t.restart}
                title={t.restart}
              >
                <RotateCcw size={17} />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label={t.close}
                title={t.close}
              >
                <X size={19} />
              </button>
            </div>
          </div>

          <div className="assistant-language-bar">
            <Languages size={17} />

            <select
              value={language}
              onChange={(event) =>
                changeLanguage(event.target.value)
              }
              aria-label={t.languageLabel}
            >
              {languageOptions.map((option) => (
                <option
                  key={option.code}
                  value={option.code}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="assistant-messages">
            <div className="assistant-message assistant-message-bot">
              <p>{t.welcome}</p>
            </div>

            {messages.map((message) => (
              <div
                key={message.id}
                className={`assistant-message ${
                  message.sender === "user"
                    ? "assistant-message-user"
                    : "assistant-message-bot"
                }`}
              >
                <p>{message.text}</p>

                {message.link && (
                  <Link
                    to={message.link}
                    className="assistant-message-link"
                    onClick={() => setIsOpen(false)}
                  >
                    {message.linkText} →
                  </Link>
                )}

                {message.externalLink && (
                  <a
                    href={message.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="assistant-message-link"
                  >
                    {message.linkText} ↗
                  </a>
                )}
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          <div className="assistant-suggestions">
            {t.questions.map((question, index) => (
              <button
                key={question}
                type="button"
                onClick={() =>
                  sendMessage(
                    question,
                    suggestedTopicIds[index]
                  )
                }
              >
                {question}
              </button>
            ))}
          </div>

          <form
            className="assistant-input-area"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage(input);
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              maxLength={300}
              onChange={(event) => setInput(event.target.value)}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
            />

            <button
              type="submit"
              disabled={!input.trim()}
              aria-label={t.send}
            >
              <Send size={18} />
            </button>
          </form>

          <p className="assistant-disclaimer">
            {t.disclaimer}
          </p>
        </div>
      )}

      <button
        type="button"
        className="assistant-floating-button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label={isOpen ? t.close : t.open}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={26} /> : <MessageCircle size={27} />}
      </button>
    </div>
  );
}

export default StudentAssistant;
