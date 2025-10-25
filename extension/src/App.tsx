import './App.css'; import { useState, useEffect } from "react"; import robotIcon from "./assets/robotIcon.svg"; import Settings from "./components/Settings"; function App() { const [output, setOutput] = useState(""); const [inputText, setInputText] = useState(""); const [isDarkMode, setIsDarkMode] = useState(false); const [buttonPage, setButtonPage] = useState(0); const [showSettings, setShowSettings] = useState(false); const [fontSize, setFontSize] = useState("medium"); const [animationsEnabled, setAnimationsEnabled] = useState(true); const [highContrast, setHighContrast] = useState(false); const [language, setLanguage] = useState<LanguageKey>("en"); const [backendMessage, setBackendMessage] = useState(""); const labels = { en: { input: "Input", output: "Output", settings: "Settings", back: "✖", title: "Offline AI Extension", buttons: { summarize: "Summarize", translate: "Translate", proofread: "Proofread", rewrite: "Rewrite", transcribe: "Transcribe", upload: "Upload", templates: "Templates", mock: "Mock Output", settings: "Settings", }, copied: "✅ Output copied to clipboard!", }, bhs: { input: "Unesi tekst", output: "Rezultat", settings: "Postavke", back: "Nazad", title: "Offline AI Ekstenzija", buttons: { summarize: "Sažmi", translate: "Prevedi", proofread: "Ispravi", rewrite: "Prepiši", transcribe: "Transkribuj", upload: "Otpremi", templates: "Šabloni", mock: "Testni izlaz", settings: "Postavke", }, copied: "✅ Rezultat je kopiran u clipboard!", }, de: { input: "Text eingeben", output: "Ausgabe", settings: "Einstellungen", back: "Zurück", title: "Offline KI Erweiterung", buttons: { summarize: "Zusammenfassen", translate: "Übersetzen", proofread: "Korrigieren", rewrite: "Umschreiben", transcribe: "Transkribieren", upload: "Hochladen", templates: "Vorlagen", mock: "Testausgabe", settings: "Einstellungen", }, copied: "✅ Ausgabe wurde in die Zwischenablage kopiert!", }, }; type LanguageKey = keyof typeof labels; type ButtonKey = keyof typeof labels["en"]["buttons"]; useEffect(() => { const savedLang = localStorage.getItem("language"); if (savedLang === "en" || savedLang === "bhs" || savedLang === "de") { setLanguage(savedLang); } const savedMode = localStorage.getItem("darkMode"); if (savedMode === "true") setIsDarkMode(true); const savedFont = localStorage.getItem("fontSize"); if (savedFont) setFontSize(savedFont); const savedAnim = localStorage.getItem("animationsEnabled"); if (savedAnim) setAnimationsEnabled(savedAnim === "true"); const savedContrast = localStorage.getItem("highContrast"); if (savedContrast) setHighContrast(savedContrast === "true"); }, []); useEffect(() => { localStorage.setItem("language", language); }, [language]); useEffect(() => { document.body.classList.toggle('dark-body', isDarkMode); document.body.classList.toggle('light-body', !isDarkMode); localStorage.setItem("darkMode", isDarkMode.toString()); }, [isDarkMode]); useEffect(() => { localStorage.setItem("fontSize", fontSize); }, [fontSize]); useEffect(() => { document.body.classList.toggle("high-contrast", highContrast); localStorage.setItem("highContrast", highContrast.toString()); }, [highContrast]); useEffect(() => { localStorage.setItem("animationsEnabled", animationsEnabled.toString()); }, [animationsEnabled]); useEffect(() => { fetch("http://localhost:5000/api/hello") .then((res) => res.json()) .then((data) => setBackendMessage(data.message)) .catch((err) => console.error("Greška u komunikaciji s backendom:", err) ); }, []); const sendMessageToContent = (type: string) => { if (type === "OPEN_SETTINGS") { setShowSettings(true); return; } if (inputText.trim() === "") { setOutput("⚠️ No input provided."); return; } const endpoint = type === "SUMMARIZE_TEXT" ? "http://localhost:5050/api/summarize" : "http://localhost:5000/api/process"; const payload = type === "SUMMARIZE_TEXT" ? { text: inputText } : { text: inputText, type }; fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), }) .then((res) => res.json()) .then((data) => { const result = type === "SUMMARIZE_TEXT" ? data.summary : data.result; setOutput(result); }) .catch((err) => { console.error("Greška u komunikaciji s backendom:", err); setOutput("⚠️ Backend greška."); }); }; const allButtons: { key: ButtonKey; icon: string; type: string }[] = [ { key: "summarize", icon: "🧠", type: "SUMMARIZE_TEXT" }, { key: "translate", icon: "🌐", type: "TRANSLATE_TEXT" }, { key: "proofread", icon: "➕", type: "PROOFREAD_TEXT" }, { key: "rewrite", icon: "✏️", type: "REWRITE_TEXT" }, { key: "transcribe", icon: "🎤", type: "TRANSCRIBE_AUDIO" }, { key: "upload", icon: "📤", type: "MULTIMODAL_UPLOAD" }, { key: "templates", icon: "📋", type: "CUSTOM_TEMPLATES" }, { key: "mock", icon: "🧪", type: "MOCK_OUTPUT" }, { key: "settings", icon: "⚙️", type: "OPEN_SETTINGS" }, ]; const buttonsPerPage = 4; const totalPages = Math.ceil(allButtons.length / buttonsPerPage); const visibleButtons = allButtons.slice( buttonPage * buttonsPerPage, (buttonPage + 1) * buttonsPerPage ); return ( <div className={`popup-container ${isDarkMode ? 'dark-mode' : 'light-mode'} font-${fontSize}`}> {showSettings ? ( <> <div className="header"> <button className="back-button" onClick={() => setShowSettings(false)}> {labels[language].back} </button> <h2 className="title">{labels[language].settings}</h2> </div> <Settings isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} fontSize={fontSize} setFontSize={setFontSize} highContrast={highContrast} setHighContrast={setHighContrast} language={language} setLanguage={setLanguage} /> </> ) : ( <> <div className="header"> <div className="logo"> <img src={robotIcon} alt="AI Logo" className={animationsEnabled ? "robot-animation" : ""} /> </div> <h2 className="title">{labels[language].title}</h2> </div> <textarea className="text-input" placeholder="" value={inputText} onChange={(e) => setInputText(e.target.value)} /> <div className="button-row"> {buttonPage > 0 && ( <button className="nav-button prev-button" onClick={() => setButtonPage(buttonPage - 1)}> &lt; </button> )} <div className="button-group"> {visibleButtons.map((btn, index) => ( <button key={index} className="ai-button" onClick={() => sendMessageToContent(btn.type)}>
                  <span className="icon">{btn.icon}</span>
                  <span className="label">{labels[language].buttons[btn.key]}</span>
                </button>
              ))}
            </div>

            {buttonPage < totalPages - 1 && (
              <button className="nav-button next-button" onClick={() => setButtonPage(buttonPage + 1)}>
                &gt;
              </button>
            )}
          </div>

          <textarea
            className="text-output"
            readOnly
            value={output}
            placeholder={labels[language].output}
            onClick={() => {
              if (output) {
                navigator.clipboard.writeText(output);
                alert(labels[language].copied);
              }
            }}
          />

          {backendMessage && (
            <div className="backend-message">
              <p className="text-sm text-green-400 mt-2">
                🔗 Backend kaže: {backendMessage}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
