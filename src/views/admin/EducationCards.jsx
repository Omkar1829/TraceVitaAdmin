import React from "react";
import {
  MdInfoOutline,
  MdHealthAndSafety,
  MdEmojiFoodBeverage,
  MdEnergySavingsLeaf,
} from "react-icons/md";

const educationData = [
  {
    id: 1,
    title: "Why Iron Matters?",
    description:
      "Understand the importance of iron in your diet, its role in oxygen transport and how to avoid deficiency.",
    icon: <MdHealthAndSafety className="text-vitalGreen text-3xl" />,
    link: "#",
  },
  {
    id: 2,
    title: "The Power of Vitamin D",
    description:
      "Learn how Vitamin D supports immunity, bones and mood — and how to naturally increase your levels.",
    icon: <MdEmojiFoodBeverage className="text-vitalGreen text-3xl" />,
    link: "#",
  },
  {
    id: 3,
    title: "Daily Fiber Needs",
    description:
      "Discover how fiber boosts digestion, helps regulate blood sugar, and supports gut health.",
    icon: <MdInfoOutline className="text-vitalGreen text-3xl" />,
    link: "#",
  },
  {
    id: 4,
    title: "Energy & Micronutrients",
    description:
      "Understand how micronutrients like magnesium and B12 affect energy levels, focus and recovery.",
    icon: <MdEnergySavingsLeaf className="text-vitalGreen text-3xl" />,
    link: "#",
  },
];

const Education = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-deepIndigo mb-6">Education Center</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {educationData.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-vitalGreen/10">{item.icon}</div>
              <h2 className="text-lg font-semibold text-deepIndigo">{item.title}</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">{item.description}</p>
            <a
              href={item.link}
              className="text-vitalGreen font-medium text-sm hover:underline"
            >
              Learn more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
