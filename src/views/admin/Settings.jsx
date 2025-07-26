import React, { useState } from "react";
import {
  MdSettings,
  MdSecurity,
  MdBolt,
  MdColorLens,
  MdPayments,
  MdApi,
  MdOutlineDeveloperMode,
} from "react-icons/md";

const Settings = () => {
  const [settings, setSettings] = useState({
    openaiKey: "",
    groqKey: "",
    claudeKey: "",
    appName: "TraceVita",
    primaryColor: "#00C896",
    gdpr: true,
    mode: "Test",
    maintenance: false,
    featureToggles: {
      deficiencyPredictor: true,
      mealBuilder: true,
      moodNutrition: true,
      groceryBridge: false,
      communitySupport: true,
    },
  });

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggleFeature = (feature) => {
    setSettings((prev) => ({
      ...prev,
      featureToggles: {
        ...prev.featureToggles,
        [feature]: !prev.featureToggles[feature],
      },
    }));
  };

  const handleSave = () => {
    console.log("Saving settings:", settings);
    alert("Settings saved successfully!");
  };

  return (
    <div className="p-6 space-y-8 w-full">
      <h1 className="text-2xl font-bold text-deepIndigo flex items-center gap-2">
        <MdSettings className="text-vitalGreen" /> Application Settings
      </h1>

      {/* 🔐 API Keys */}
      <SettingsSection icon={<MdApi />} title="API Keys">
        {["OpenAI", "Groq", "Claude"].map((provider) => (
          <Input
            key={provider}
            label={`${provider} API Key`}
            value={settings[`${provider.toLowerCase()}Key`]}
            onChange={(val) => handleChange(`${provider.toLowerCase()}Key`, val)}
            secure
          />
        ))}
      </SettingsSection>

      {/* 🎛 Feature Toggles */}
      <SettingsSection icon={<MdBolt />} title="Feature Toggles">
        {Object.entries(settings.featureToggles).map(([key, value]) => (
          <Toggle
            key={key}
            label={toLabel(key)}
            checked={value}
            onChange={() => handleToggleFeature(key)}
          />
        ))}
      </SettingsSection>

      {/* 🎨 Branding Settings */}
      <SettingsSection icon={<MdColorLens />} title="Brand Settings">
        <Input
          label="App Name"
          value={settings.appName}
          onChange={(val) => handleChange("appName", val)}
        />
        <div>
          <label className="block text-sm text-gray-600 mb-1">Primary Color</label>
          <input
            type="color"
            value={settings.primaryColor}
            onChange={(e) => handleChange("primaryColor", e.target.value)}
            className="w-16 h-10 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Logo Upload</label>
          <input type="file" className="w-full" />
        </div>
      </SettingsSection>

      {/* ⚙ App Settings */}
      <SettingsSection icon={<MdSecurity />} title="App Settings">
        <Toggle
          label="GDPR/HIPAA Compliance"
          checked={settings.gdpr}
          onChange={(val) => handleChange("gdpr", val)}
        />
        <div className="mb-4">
          <label className="text-sm text-gray-600">App Mode</label>
          <select
            className="border rounded-md p-2 ml-4"
            value={settings.mode}
            onChange={(e) => handleChange("mode", e.target.value)}
          >
            <option>Test</option>
            <option>Live</option>
          </select>
        </div>
        <Toggle
          label="Maintenance Mode"
          checked={settings.maintenance}
          onChange={(val) => handleChange("maintenance", val)}
        />
      </SettingsSection>

      {/* Save Button */}
      <div className="pt-4">
        <button
          className="bg-vitalGreen hover:bg-emerald-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition"
          onClick={handleSave}
        >
          Save All Settings
        </button>
      </div>
    </div>
  );
};

// 🧩 Reusable Sections
const SettingsSection = ({ title, icon, children }) => (
  <div className="bg-white rounded-2xl shadow p-6 space-y-4">
    <h2 className="text-lg font-semibold text-deepIndigo flex items-center gap-2 mb-2">
      {icon} {title}
    </h2>
    {children}
  </div>
);

const Input = ({ label, value, onChange, type = "text", secure }) => (
  <div className="mb-4">
    <label className="block mb-1 text-sm font-medium text-gray-600">{label}</label>
    <input
      type={secure ? "password" : type}
      className="w-full px-3 py-2 border rounded-md shadow-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const Toggle = ({ label, checked, onChange }) => (
  <div className="flex justify-between items-center mb-4">
    <label className="text-sm text-gray-600">{label}</label>
    <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
  </div>
);

const toLabel = (str) =>
  str
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default Settings;
