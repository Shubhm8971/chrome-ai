import React from "react";

type LanguageKey = "en" | "bhs" | "de";

type SettingsProps = {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
  fontSize: string;
  setFontSize: (value: string) => void;
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
  language: LanguageKey;
  setLanguage: React.Dispatch<React.SetStateAction<LanguageKey>>;
};

const labels: Record<LanguageKey, {
  title: string;
  theme: string;
  fontSize: string;
  contrast: string;
  language: string;
  dark: string;
  light: string;
}> = {
  en: {
    title: "Settings",
    theme: "Dark / Light Mode",
    fontSize: "Font size",
    contrast: "High contrast",
    language: "Language",
    dark: "Dark",
    light: "Light",
  },
  bhs: {
    title: "Postavke",
    theme: "Tamni / Svijetli režim",
    fontSize: "Veličina fonta",
    contrast: "Visoki kontrast",
    language: "Jezik",
    dark: "Tamna",
    light: "Svijetla",
  },
  de: {
    title: "Einstellungen",
    theme: "Dunkel / Hell Modus",
    fontSize: "Schriftgröße",
    contrast: "Hoher Kontrast",
    language: "Sprache",
    dark: "Dunkel",
    light: "Hell",
  },
};

function Settings({
  isDarkMode,
  setIsDarkMode,
  fontSize,
  setFontSize,
  highContrast,
  setHighContrast,
  language,
  setLanguage,
}: SettingsProps) {
  const t = labels[language];

  return (
    <div className="settings-container">
      <h2>{t.title}</h2>

      {/* Tema: Dark / Light */}
      <div className="setting-row">
        <span className="setting-label">{t.theme}</span>
        <div className="mode-switch" onClick={() => setIsDarkMode(!isDarkMode)}>
          <div className={`switch-track ${isDarkMode ? "dark" : "light"}`}>
            <div
              className={`switch-thumb ${
                isDarkMode ? "thumb-right" : "thumb-left"
              }`}
            />
          </div>
          <span className="mode-label">
            {isDarkMode ? t.dark : t.light}
          </span>
        </div>
      </div>

      {/* Font veličina */}
      <div className="setting-row">
        <span className="setting-label">{t.fontSize}</span>
        <select
          className="setting-select"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>

      {/* Visoki kontrast */}
      <div className="setting-row">
        <span className="setting-label">{t.contrast}</span>
        <input
          type="checkbox"
          className="setting-toggle"
          checked={highContrast}
          onChange={(e) => setHighContrast(e.target.checked)}
        />
      </div>

      {/* Jezik interfejsa */}
      <div className="setting-row">
        <span className="setting-label">{t.language}</span>
        <select
          className="setting-select"
          value={language}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "en" || value === "bhs" || value === "de") {
              setLanguage(value);
            }
          }}
        >
          <option value="en">English</option>
          <option value="bhs">Bosnian</option>
          <option value="de">German</option>
        </select>
      </div>
    </div>
  );
}

export default Settings;
