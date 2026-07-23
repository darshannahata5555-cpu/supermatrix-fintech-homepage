(() => {
  const CONTACT_PHONE = "022-2652-8671";
  const CONTACT_EMAIL = "support@supermatrix.in";

  const knowledge = [
    {
      keys: ["hello", "hi", "hey", "help"],
      answer: "Hello! I can help with general information about SuperMatrix, mutual funds, SIPs, SWPs, ELSS, Fund of Funds, PMS, goal planning, and account support."
    },
    {
      keys: ["mutual fund", "mutual funds"],
      answer: "Mutual funds pool money from multiple investors and invest through professionally managed schemes. Categories include equity, debt, and hybrid funds. Returns are market-linked and are not guaranteed."
    },
    {
      keys: ["sip", "systematic investment", "monthly investment"],
      answer: "A Systematic Investment Plan (SIP) lets you invest a fixed amount at regular intervals, usually monthly, into a mutual fund. It supports disciplined investing and may help average purchase costs across market cycles."
    },
    {
      keys: ["swp", "systematic withdrawal", "withdrawal plan"],
      answer: "A Systematic Withdrawal Plan (SWP) redeems a chosen amount or number of units from a mutual fund at scheduled intervals. Withdrawals reduce the invested corpus and may have tax implications."
    },
    {
      keys: ["fof", "fund of funds"],
      answer: "A Fund of Funds invests in other funds rather than directly in individual securities. It can provide diversified exposure across managers, assets, strategies, or geographies, but may involve layered costs."
    },
    {
      keys: ["elss", "tax saving", "80c", "tax saver"],
      answer: "ELSS is an equity-oriented mutual fund category with a statutory three-year lock-in. Eligible investments may qualify under Section 80C, subject to current tax law and individual circumstances."
    },
    {
      keys: ["pms", "portfolio management", "managed portfolio"],
      answer: "Portfolio Management Services (PMS) provide professionally managed equity or debt portfolios for eligible investors, subject to regulatory requirements and minimum investment rules. PMS can carry concentration, market, credit, and liquidity risks."
    },
    {
      keys: ["goal planning", "goal based", "retirement", "education", "dream home", "marriage"],
      answer: "Goal-based planning connects investments to a target amount and time horizon, such as retirement, education, marriage, or a home. Projections rely on assumptions and should be reviewed periodically."
    },
    {
      keys: ["charge", "charges", "fee", "fees", "commission", "cost"],
      answer: "SuperMatrix distributes Regular Plan mutual fund schemes and may receive commission from Asset Management Companies in accordance with applicable regulations. Please contact the team for product-specific charges and disclosures."
    },
    {
      keys: ["return", "returns", "guarantee", "profit", "interest rate"],
      answer: "Mutual fund and portfolio returns are market-linked and are not guaranteed. Calculator results are illustrations based on selected assumptions, not promises of future performance."
    },
    {
      keys: ["kyc", "onboarding", "register", "registration", "start investing"],
      answer: "To begin investing, you will generally need to complete registration and applicable KYC requirements. For the current onboarding process, please contact the SuperMatrix support team."
    },
    {
      keys: ["redeem", "redemption", "pause sip", "stop sip", "modify sip"],
      answer: "SIP modification, pause, stop, and redemption instructions depend on the applicable scheme and processing timelines. Please contact SuperMatrix support for assistance with your account."
    },
    {
      keys: ["contact", "customer care", "support", "phone", "email", "advisor"],
      answer: `You can contact SuperMatrix customer care at ${CONTACT_PHONE} or ${CONTACT_EMAIL}.`
    }
  ];

  const adviceTerms = ["which fund", "best fund", "should i invest", "where should i invest", "recommend", "guaranteed return", "portfolio for me"];

  function normalise(value) {
    return value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  }

  function findAnswer(question) {
    const query = normalise(question);
    if (!query) return null;
    if (adviceTerms.some(term => query.includes(term))) {
      return {
        text: "I can provide general product information, but I cannot recommend a specific investment or promise returns. Please speak with the SuperMatrix team for assistance based on your circumstances.",
        contact: true
      };
    }

    let best = null;
    let bestScore = 0;
    knowledge.forEach(item => {
      let score = 0;
      item.keys.forEach(key => {
        if (query.includes(key)) score += key.includes(" ") ? 3 : 1;
      });
      if (score > bestScore) {
        bestScore = score;
        best = item;
      }
    });

    if (best && bestScore > 0) return { text: best.answer, contact: false };
    return {
      text: "I don’t have verified information about that in the SuperMatrix FAQ data. Please contact customer care for help.",
      contact: true
    };
  }

  function buildChatbot() {
    if (document.querySelector(".sm-chatbot")) return;

    const root = document.createElement("div");
    root.className = "sm-chatbot";
    root.innerHTML = `
      <section class="sm-chat-window" role="dialog" aria-modal="false" aria-label="SuperMatrix FAQ assistant">
        <header class="sm-chat-header">
          <span class="sm-chat-avatar"><img src="./assets/supermatrix-logo.svg" alt=""></span>
          <span><span class="sm-chat-title">SuperMatrix Assistant</span><span class="sm-chat-status">FAQ support · No AI</span></span>
          <button class="sm-chat-close" type="button" aria-label="Close chat">&times;</button>
        </header>
        <div class="sm-chat-messages" aria-live="polite"></div>
        <form class="sm-chat-form">
          <input class="sm-chat-input" type="text" maxlength="240" autocomplete="off" placeholder="Ask a question…" aria-label="Ask a question">
          <button class="sm-chat-send" type="submit" aria-label="Send question">&#10148;</button>
        </form>
      </section>
      <button class="sm-chat-toggle" type="button" aria-label="Open FAQ assistant" aria-expanded="false">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.8 9.8 0 0 1-3.8-.8L3 21l1.7-4.6A8.3 8.3 0 1 1 21 11.5Z"/><path d="M8 10h8M8 14h5"/></svg>
      </button>`;

    document.body.appendChild(root);
    const toggle = root.querySelector(".sm-chat-toggle");
    const close = root.querySelector(".sm-chat-close");
    const form = root.querySelector(".sm-chat-form");
    const input = root.querySelector(".sm-chat-input");
    const messages = root.querySelector(".sm-chat-messages");

    function addMessage(text, type, contact = false) {
      const row = document.createElement("div");
      row.className = `sm-chat-row ${type}`;
      const bubble = document.createElement("div");
      bubble.className = "sm-chat-bubble";
      bubble.textContent = text;
      if (type === "bot" && contact) {
        bubble.appendChild(document.createElement("br"));
        const phone = document.createElement("a");
        phone.href = "tel:02226528671";
        phone.textContent = CONTACT_PHONE;
        const separator = document.createTextNode(" · ");
        const email = document.createElement("a");
        email.href = `mailto:${CONTACT_EMAIL}`;
        email.textContent = CONTACT_EMAIL;
        bubble.append(phone, separator, email);
      }
      if (type === "bot") {
        const note = document.createElement("span");
        note.className = "sm-chat-note";
        note.textContent = "General information only. Mutual fund investments are subject to market risks.";
        bubble.appendChild(note);
      }
      row.appendChild(bubble);
      messages.appendChild(row);
      messages.scrollTop = messages.scrollHeight;
    }

    function ask(question) {
      addMessage(question, "user");
      const response = findAnswer(question);
      if (response) window.setTimeout(() => addMessage(response.text, "bot", response.contact), 180);
    }

    function addSuggestions() {
      const suggestions = document.createElement("div");
      suggestions.className = "sm-chat-suggestions";
      ["What is SIP?", "Tell me about ELSS", "Are returns guaranteed?", "Contact support"].forEach(label => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "sm-chat-suggestion";
        button.textContent = label;
        button.addEventListener("click", () => {
          suggestions.remove();
          ask(label);
        });
        suggestions.appendChild(button);
      });
      messages.appendChild(suggestions);
    }

    function setOpen(open) {
      root.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close FAQ assistant" : "Open FAQ assistant");
      if (open) {
        if (!messages.children.length) {
          addMessage("Hi! I’m the SuperMatrix FAQ assistant. Ask me about our products or account support.", "bot");
          addSuggestions();
        }
        window.setTimeout(() => input.focus(), 50);
      }
    }

    toggle.addEventListener("click", () => setOpen(!root.classList.contains("is-open")));
    close.addEventListener("click", () => setOpen(false));
    form.addEventListener("submit", event => {
      event.preventDefault();
      const question = input.value.trim();
      if (!question) return;
      input.value = "";
      ask(question);
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && root.classList.contains("is-open")) setOpen(false);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", buildChatbot);
  else buildChatbot();
})();
