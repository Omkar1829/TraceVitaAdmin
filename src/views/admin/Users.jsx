import React, { useState, useEffect } from "react";
import { MdSearch, MdVisibility, MdDelete, MdUpgrade } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";

const usersData = [
  {
    id: 1,
    name: "Omkar Kale",
    email: "omkar@example.com",
    plan: "Premium",
    status: "Active",
    joined: "2025-06-01",
    onboardingDate: "2025-06-01",
    payments: 3,
    paymentMode: "Stripe",
    planExpiry: "2026-06-01",
    age: 28,
    gender: "Male",
    height: "178 cm",
    weight: "72 kg",
    goal: "Immunity Boost",
    diet: "Vegan",
  },
  {
    id: 2,
    name: "Aisha Khan",
    email: "aisha@example.com",
    plan: "Free",
    status: "Active",
    joined: "2025-05-21",
    onboardingDate: "2025-05-21",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 30,
    gender: "Female",
    height: "162 cm",
    weight: "60 kg",
    goal: "Fitness",
    diet: "Keto",
  },
  {
    id: 3,
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    plan: "Basic",
    status: "Active",
    joined: "2025-04-15",
    onboardingDate: "2025-04-15",
    payments: 2,
    paymentMode: "PayPal",
    planExpiry: "2026-04-15",
    age: 34,
    gender: "Male",
    height: "175 cm",
    weight: "80 kg",
    goal: "Weight Loss",
    diet: "Vegetarian",
  },
  {
    id: 4,
    name: "Priya Patel",
    email: "priya.patel@example.com",
    plan: "Premium",
    status: "Inactive",
    joined: "2025-03-10",
    onboardingDate: "2025-03-10",
    payments: 5,
    paymentMode: "Stripe",
    planExpiry: "2025-09-10",
    age: 27,
    gender: "Female",
    height: "158 cm",
    weight: "55 kg",
    goal: "Muscle Gain",
    diet: "Paleo",
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    plan: "Free",
    status: "Active",
    joined: "2025-07-01",
    onboardingDate: "2025-07-01",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 40,
    gender: "Male",
    height: "182 cm",
    weight: "90 kg",
    goal: "Fitness",
    diet: "Balanced",
  },
  {
    id: 6,
    name: "Sana Mirza",
    email: "sana.mirza@example.com",
    plan: "Basic",
    status: "Active",
    joined: "2025-06-20",
    onboardingDate: "2025-06-20",
    payments: 1,
    paymentMode: "PayPal",
    planExpiry: "2026-06-20",
    age: 25,
    gender: "Female",
    height: "165 cm",
    weight: "58 kg",
    goal: "Immunity Boost",
    diet: "Vegetarian",
  },
  {
    id: 7,
    name: "Arjun Reddy",
    email: "arjun.reddy@example.com",
    plan: "Premium",
    status: "Active",
    joined: "2025-02-14",
    onboardingDate: "2025-02-14",
    payments: 6,
    paymentMode: "Stripe",
    planExpiry: "2026-02-14",
    age: 32,
    gender: "Male",
    height: "180 cm",
    weight: "78 kg",
    goal: "Muscle Gain",
    diet: "High Protein",
  },
  {
    id: 8,
    name: "Neha Gupta",
    email: "neha.gupta@example.com",
    plan: "Free",
    status: "Inactive",
    joined: "2025-05-05",
    onboardingDate: "2025-05-05",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 29,
    gender: "Female",
    height: "160 cm",
    weight: "62 kg",
    goal: "Weight Loss",
    diet: "Keto",
  },
  {
    id: 9,
    name: "Karan Mehta",
    email: "karan.mehta@example.com",
    plan: "Basic",
    status: "Active",
    joined: "2025-07-10",
    onboardingDate: "2025-07-10",
    payments: 1,
    paymentMode: "PayPal",
    planExpiry: "2026-07-10",
    age: 31,
    gender: "Male",
    height: "170 cm",
    weight: "75 kg",
    goal: "Fitness",
    diet: "Balanced",
  },
  {
    id: 10,
    name: "Ananya Desai",
    email: "ananya.desai@example.com",
    plan: "Premium",
    status: "Active",
    joined: "2025-01-25",
    onboardingDate: "2025-01-25",
    payments: 7,
    paymentMode: "Stripe",
    planExpiry: "2026-01-25",
    age: 26,
    gender: "Female",
    height: "163 cm",
    weight: "57 kg",
    goal: "Immunity Boost",
    diet: "Vegan",
  },
  {
    id: 11,
    name: "Ravi Kumar",
    email: "ravi.kumar@example.com",
    plan: "Free",
    status: "Active",
    joined: "2025-06-25",
    onboardingDate: "2025-06-25",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 35,
    gender: "Male",
    height: "176 cm",
    weight: "82 kg",
    goal: "Weight Loss",
    diet: "Vegetarian",
  },
  {
    id: 12,
    name: "Meera Joshi",
    email: "meera.joshi@example.com",
    plan: "Basic",
    status: "Active",
    joined: "2025-04-22",
    onboardingDate: "2025-04-22",
    payments: 2,
    paymentMode: "PayPal",
    planExpiry: "2026-04-22",
    age: 28,
    gender: "Female",
    height: "159 cm",
    weight: "54 kg",
    goal: "Fitness",
    diet: "Paleo",
  },
  {
    id: 13,
    name: "Aditya Roy",
    email: "aditya.roy@example.com",
    plan: "Premium",
    status: "Inactive",
    joined: "2025-03-01",
    onboardingDate: "2025-03-01",
    payments: 4,
    paymentMode: "Stripe",
    planExpiry: "2025-09-01",
    age: 33,
    gender: "Male",
    height: "179 cm",
    weight: "85 kg",
    goal: "Muscle Gain",
    diet: "High Protein",
  },
  {
    id: 14,
    name: "Shreya Nair",
    email: "shreya.nair@example.com",
    plan: "Free",
    status: "Active",
    joined: "2025-07-15",
    onboardingDate: "2025-07-15",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 27,
    gender: "Female",
    height: "161 cm",
    weight: "59 kg",
    goal: "Immunity Boost",
    diet: "Keto",
  },
  {
    id: 15,
    name: "Siddharth Bose",
    email: "siddharth.bose@example.com",
    plan: "Basic",
    status: "Active",
    joined: "2025-05-30",
    onboardingDate: "2025-05-30",
    payments: 1,
    paymentMode: "PayPal",
    planExpiry: "2026-05-30",
    age: 30,
    gender: "Male",
    height: "174 cm",
    weight: "77 kg",
    goal: "Fitness",
    diet: "Balanced",
  },
  {
    id: 16,
    name: "Lakshmi Iyer",
    email: "lakshmi.iyer@example.com",
    plan: "Premium",
    status: "Active",
    joined: "2025-02-20",
    onboardingDate: "2025-02-20",
    payments: 5,
    paymentMode: "Stripe",
    planExpiry: "2026-02-20",
    age: 29,
    gender: "Female",
    height: "157 cm",
    weight: "53 kg",
    goal: "Weight Loss",
    diet: "Vegan",
  },
  {
    id: 17,
    name: "Rohan Das",
    email: "rohan.das@example.com",
    plan: "Free",
    status: "Active",
    joined: "2025-06-10",
    onboardingDate: "2025-06-10",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 36,
    gender: "Male",
    height: "181 cm",
    weight: "88 kg",
    goal: "Muscle Gain",
    diet: "High Protein",
  },
  {
    id: 18,
    name: "Tara Menon",
    email: "tara.menon@example.com",
    plan: "Basic",
    status: "Inactive",
    joined: "2025-04-05",
    onboardingDate: "2025-04-05",
    payments: 2,
    paymentMode: "PayPal",
    planExpiry: "2025-10-05",
    age: 31,
    gender: "Female",
    height: "164 cm",
    weight: "61 kg",
    goal: "Fitness",
    diet: "Vegetarian",
  },
  {
    id: 19,
    name: "Amitabh Verma",
    email: "amitabh.verma@example.com",
    plan: "Premium",
    status: "Active",
    joined: "2025-01-15",
    onboardingDate: "2025-01-15",
    payments: 6,
    paymentMode: "Stripe",
    planExpiry: "2026-01-15",
    age: 38,
    gender: "Male",
    height: "177 cm",
    weight: "83 kg",
    goal: "Immunity Boost",
    diet: "Balanced",
  },
  {
    id: 20,
    name: "Divya Shah",
    email: "divya.shah@example.com",
    plan: "Free",
    status: "Active",
    joined: "2025-07-05",
    onboardingDate: "2025-07-05",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 26,
    gender: "Female",
    height: "160 cm",
    weight: "56 kg",
    goal: "Weight Loss",
    diet: "Keto",
  },
  {
    id: 21,
    name: "Nikhil Jain",
    email: "nikhil.jain@example.com",
    plan: "Basic",
    status: "Active",
    joined: "2025-06-15",
    onboardingDate: "2025-06-15",
    payments: 1,
    paymentMode: "PayPal",
    planExpiry: "2026-06-15",
    age: 29,
    gender: "Male",
    height: "173 cm",
    weight: "76 kg",
    goal: "Fitness",
    diet: "Paleo",
  },
  {
    id: 22,
    name: "Riya Malhotra",
    email: "riya.malhotra@example.com",
    plan: "Premium",
    status: "Active",
    joined: "2025-03-25",
    onboardingDate: "2025-03-25",
    payments: 4,
    paymentMode: "Stripe",
    planExpiry: "2026-03-25",
    age: 27,
    gender: "Female",
    height: "162 cm",
    weight: "58 kg",
    goal: "Immunity Boost",
    diet: "Vegan",
  },
  {
    id: 23,
    name: "Sameer Thakur",
    email: "sameer.thakur@example.com",
    plan: "Free",
    status: "Inactive",
    joined: "2025-05-12",
    onboardingDate: "2025-05-12",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 34,
    gender: "Male",
    height: "178 cm",
    weight: "81 kg",
    goal: "Muscle Gain",
    diet: "High Protein",
  },
  {
    id: 24,
    name: "Anjali Rao",
    email: "anjali.rao@example.com",
    plan: "Basic",
    status: "Active",
    joined: "2025-07-20",
    onboardingDate: "2025-07-20",
    payments: 1,
    paymentMode: "PayPal",
    planExpiry: "2026-07-20",
    age: 30,
    gender: "Female",
    height: "159 cm",
    weight: "55 kg",
    goal: "Weight Loss",
    diet: "Vegetarian",
  },
  {
    id: 25,
    name: "Manish Choudhary",
    email: "manish.choudhary@example.com",
    plan: "Premium",
    status: "Active",
    joined: "2025-02-10",
    onboardingDate: "2025-02-10",
    payments: 5,
    paymentMode: "Stripe",
    planExpiry: "2026-02-10",
    age: 36,
    gender: "Male",
    height: "180 cm",
    weight: "84 kg",
    goal: "Fitness",
    diet: "Balanced",
  },
  {
    id: 26,
    name: "Pooja Bhatt",
    email: "pooja.bhatt@example.com",
    plan: "Free",
    status: "Active",
    joined: "2025-06-30",
    onboardingDate: "2025-06-30",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 28,
    gender: "Female",
    height: "161 cm",
    weight: "57 kg",
    goal: "Immunity Boost",
    diet: "Keto",
  },
  {
    id: 27,
    name: "Vivek Oberoi",
    email: "vivek.oberoi@example.com",
    plan: "Basic",
    status: "Active",
    joined: "2025-04-18",
    onboardingDate: "2025-04-18",
    payments: 2,
    paymentMode: "PayPal",
    planExpiry: "2026-04-18",
    age: 33,
    gender: "Male",
    height: "176 cm",
    weight: "79 kg",
    goal: "Muscle Gain",
    diet: "High Protein",
  },
  {
    id: 28,
    name: "Kavya Suresh",
    email: "kavya.suresh@example.com",
    plan: "Premium",
    status: "Inactive",
    joined: "2025-03-15",
    onboardingDate: "2025-03-15",
    payments: 4,
    paymentMode: "Stripe",
    planExpiry: "2025-09-15",
    age: 29,
    gender: "Female",
    height: "158 cm",
    weight: "54 kg",
    goal: "Weight Loss",
    diet: "Vegan",
  },
  {
    id: 29,
    name: "Suresh Menon",
    email: "suresh.menon@example.com",
    plan: "Free",
    status: "Active",
    joined: "2025-07-12",
    onboardingDate: "2025-07-12",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 37,
    gender: "Male",
    height: "182 cm",
    weight: "87 kg",
    goal: "Fitness",
    diet: "Balanced",
  },
  {
    id: 30,
    name: "Sneha Kapoor",
    email: "sneha.kapoor@example.com",
    plan: "Basic",
    status: "Active",
    joined: "2025-05-25",
    onboardingDate: "2025-05-25",
    payments: 1,
    paymentMode: "PayPal",
    planExpiry: "2026-05-25",
    age: 26,
    gender: "Female",
    height: "163 cm",
    weight: "59 kg",
    goal: "Immunity Boost",
    diet: "Paleo",
  },
  {
    id: 31,
    name: "Akash Tiwari",
    email: "akash.tiwari@example.com",
    plan: "Premium",
    status: "Active",
    joined: "2025-01-30",
    onboardingDate: "2025-01-30",
    payments: 6,
    paymentMode: "Stripe",
    planExpiry: "2026-01-30",
    age: 34,
    gender: "Male",
    height: "175 cm",
    weight: "80 kg",
    goal: "Muscle Gain",
    diet: "High Protein",
  },
  {
    id: 32,
    name: "Ritu Agarwal",
    email: "ritu.agarwal@example.com",
    plan: "Free",
    status: "Active",
    joined: "2025-06-05",
    onboardingDate: "2025-06-05",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 30,
    gender: "Female",
    height: "160 cm",
    weight: "56 kg",
    goal: "Weight Loss",
    diet: "Keto",
  },
  {
    id: 33,
    name: "Harsh Vardhan",
    email: "harsh.vardhan@example.com",
    plan: "Basic",
    status: "Active",
    joined: "2025-07-08",
    onboardingDate: "2025-07-08",
    payments: 1,
    paymentMode: "PayPal",
    planExpiry: "2026-07-08",
    age: 32,
    gender: "Male",
    height: "179 cm",
    weight: "82 kg",
    goal: "Fitness",
    diet: "Vegetarian",
  },
  {
    id: 34,
    name: "Nidhi Sharma",
    email: "nidhi.sharma@example.com",
    plan: "Premium",
    status: "Active",
    joined: "2025-02-25",
    onboardingDate: "2025-02-25",
    payments: 5,
    paymentMode: "Stripe",
    planExpiry: "2026-02-25",
    age: 28,
    gender: "Female",
    height: "161 cm",
    weight: "57 kg",
    goal: "Immunity Boost",
    diet: "Vegan",
  },
  {
    id: 35,
    name: "Gaurav Pandey",
    email: "gaurav.pandey@example.com",
    plan: "Free",
    status: "Inactive",
    joined: "2025-05-18",
    onboardingDate: "2025-05-18",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 35,
    gender: "Male",
    height: "177 cm",
    weight: "83 kg",
    goal: "Muscle Gain",
    diet: "High Protein",
  },
  {
    id: 36,
    name: "Simran Kaur",
    email: "simran.kaur@example.com",
    plan: "Basic",
    status: "Active",
    joined: "2025-04-10",
    onboardingDate: "2025-04-10",
    payments: 2,
    paymentMode: "PayPal",
    planExpiry: "2026-04-10",
    age: 29,
    gender: "Female",
    height: "158 cm",
    weight: "55 kg",
    goal: "Weight Loss",
    diet: "Balanced",
  },
  {
    id: 37,
    name: "Yashwant Rao",
    email: "yashwant.rao@example.com",
    plan: "Premium",
    status: "Active",
    joined: "2025-03-20",
    onboardingDate: "2025-03-20",
    payments: 4,
    paymentMode: "Stripe",
    planExpiry: "2026-03-20",
    age: 33,
    gender: "Male",
    height: "180 cm",
    weight: "85 kg",
    goal: "Fitness",
    diet: "Paleo",
  },
  {
    id: 38,
    name: "Ishita Dutta",
    email: "ishita.dutta@example.com",
    plan: "Free",
    status: "Active",
    joined: "2025-07-01",
    onboardingDate: "2025-07-01",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 27,
    gender: "Female",
    height: "162 cm",
    weight: "58 kg",
    goal: "Immunity Boost",
    diet: "Keto",
  },
  {
    id: 39,
    name: "Raghav Jha",
    email: "raghav.jha@example.com",
    plan: "Basic",
    status: "Active",
    joined: "2025-06-12",
    onboardingDate: "2025-06-12",
    payments: 1,
    paymentMode: "PayPal",
    planExpiry: "2026-06-12",
    age: 31,
    gender: "Male",
    height: "176 cm",
    weight: "79 kg",
    goal: "Muscle Gain",
    diet: "High Protein",
  },
  {
    id: 40,
    name: "Shalini Pillai",
    email: "shalini.pillai@example.com",
    plan: "Premium",
    status: "Inactive",
    joined: "2025-02-15",
    onboardingDate: "2025-02-15",
    payments: 5,
    paymentMode: "Stripe",
    planExpiry: "2025-08-15",
    age: 30,
    gender: "Female",
    height: "159 cm",
    weight: "56 kg",
    goal: "Weight Loss",
    diet: "Vegetarian",
  },
  {
    id: 41,
    name: "Devendra Singh",
    email: "devendra.singh@example.com",
    plan: "Free",
    status: "Active",
    joined: "2025-07-18",
    onboardingDate: "2025-07-18",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 36,
    gender: "Male",
    height: "181 cm",
    weight: "86 kg",
    goal: "Fitness",
    diet: "Balanced",
  },
  {
    id: 42,
    name: "Kriti Mehra",
    email: "kriti.mehra@example.com",
    plan: "Basic",
    status: "Active",
    joined: "2025-05-15",
    onboardingDate: "2025-05-15",
    payments: 1,
    paymentMode: "PayPal",
    planExpiry: "2026-05-15",
    age: 28,
    gender: "Female",
    height: "160 cm",
    weight: "57 kg",
    goal: "Immunity Boost",
    diet: "Vegan",
  },
  {
    id: 43,
    name: "Abhishek Yadav",
    email: "abhishek.yadav@example.com",
    plan: "Premium",
    status: "Active",
    joined: "2025-01-20",
    onboardingDate: "2025-01-20",
    payments: 6,
    paymentMode: "Stripe",
    planExpiry: "2026-01-20",
    age: 34,
    gender: "Male",
    height: "178 cm",
    weight: "82 kg",
    goal: "Muscle Gain",
    diet: "High Protein",
  },
  {
    id: 44,
    name: "Tanvi Saxena",
    email: "tanvi.saxena@example.com",
    plan: "Free",
    status: "Active",
    joined: "2025-06-20",
    onboardingDate: "2025-06-20",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 29,
    gender: "Female",
    height: "161 cm",
    weight: "58 kg",
    goal: "Weight Loss",
    diet: "Keto",
  },
  {
    id: 45,
    name: "Sanjay Gupta",
    email: "sanjay.gupta@example.com",
    plan: "Basic",
    status: "Active",
    joined: "2025-04-25",
    onboardingDate: "2025-04-25",
    payments: 2,
    paymentMode: "PayPal",
    planExpiry: "2026-04-25",
    age: 32,
    gender: "Male",
    height: "175 cm",
    weight: "80 kg",
    goal: "Fitness",
    diet: "Paleo",
  },
  {
    id: 46,
    name: "Aditi Sharma",
    email: "aditi.sharma@example.com",
    plan: "Premium",
    status: "Active",
    joined: "2025-03-10",
    onboardingDate: "2025-03-10",
    payments: 4,
    paymentMode: "Stripe",
    planExpiry: "2026-03-10",
    age: 27,
    gender: "Female",
    height: "158 cm",
    weight: "55 kg",
    goal: "Immunity Boost",
    diet: "Vegetarian",
  },
  {
    id: 47,
    name: "Vijay Nair",
    email: "vijay.nair@example.com",
    plan: "Free",
    status: "Inactive",
    joined: "2025-07-05",
    onboardingDate: "2025-07-05",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 35,
    gender: "Male",
    height: "179 cm",
    weight: "84 kg",
    goal: "Muscle Gain",
    diet: "High Protein",
  },
  {
    id: 48,
    name: "Swati Kulkarni",
    email: "swati.kulkarni@example.com",
    plan: "Basic",
    status: "Active",
    joined: "2025-06-01",
    onboardingDate: "2025-06-01",
    payments: 1,
    paymentMode: "PayPal",
    planExpiry: "2026-06-01",
    age: 30,
    gender: "Female",
    height: "160 cm",
    weight: "56 kg",
    goal: "Weight Loss",
    diet: "Balanced",
  },
  {
    id: 49,
    name: "Prateek Mishra",
    email: "prateek.mishra@example.com",
    plan: "Premium",
    status: "Active",
    joined: "2025-02-05",
    onboardingDate: "2025-02-05",
    payments: 5,
    paymentMode: "Stripe",
    planExpiry: "2026-02-05",
    age: 33,
    gender: "Male",
    height: "177 cm",
    weight: "81 kg",
    goal: "Fitness",
    diet: "Vegan",
  },
  {
    id: 50,
    name: "Ruchi Jain",
    email: "ruchi.jain@example.com",
    plan: "Free",
    status: "Active",
    joined: "2025-07-10",
    onboardingDate: "2025-07-10",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 28,
    gender: "Female",
    height: "162 cm",
    weight: "58 kg",
    goal: "Immunity Boost",
    diet: "Keto",
  },
  {
    id: 51,
    name: "Kunal Desai",
    email: "kunal.desai@example.com",
    plan: "Basic",
    status: "Active",
    joined: "2025-05-10",
    onboardingDate: "2025-05-10",
    payments: 1,
    paymentMode: "PayPal",
    planExpiry: "2026-05-10",
    age: 31,
    gender: "Male",
    height: "176 cm",
    weight: "79 kg",
    goal: "Muscle Gain",
    diet: "High Protein",
  },
  {
    id: 52,
    name: "Preeti Menon",
    email: "preeti.menon@example.com",
    plan: "Premium",
    status: "Active",
    joined: "2025-03-05",
    onboardingDate: "2025-03-05",
    payments: 4,
    paymentMode: "Stripe",
    planExpiry: "2026-03-05",
    age: 29,
    gender: "Female",
    height: "159 cm",
    weight: "55 kg",
    goal: "Weight Loss",
    diet: "Paleo",
  },
  {
    id: 53,
    name: "Rakesh Patel",
    email: "rakesh.patel@example.com",
    plan: "Free",
    status: "Active",
    joined: "2025-06-25",
    onboardingDate: "2025-06-25",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 34,
    gender: "Male",
    height: "180 cm",
    weight: "85 kg",
    goal: "Fitness",
    diet: "Balanced",
  },
  {
    id: 54,
    name: "Ankita Roy",
    email: "ankita.roy@example.com",
    plan: "Basic",
    status: "Active",
    joined: "2025-04-15",
    onboardingDate: "2025-04-15",
    payments: 2,
    paymentMode: "PayPal",
    planExpiry: "2026-04-15",
    age: 27,
    gender: "Female",
    height: "161 cm",
    weight: "57 kg",
    goal: "Immunity Boost",
    diet: "Vegan",
  },
  {
    id: 55,
    name: "Soham Ghosh",
    email: "soham.ghosh@example.com",
    plan: "Premium",
    status: "Inactive",
    joined: "2025-02-10",
    onboardingDate: "2025-02-10",
    payments: 5,
    paymentMode: "Stripe",
    planExpiry: "2025-08-10",
    age: 36,
    gender: "Male",
    height: "178 cm",
    weight: "83 kg",
    goal: "Muscle Gain",
    diet: "High Protein",
  },
  {
    id: 56,
    name: "Mansi Verma",
    email: "mansi.verma@example.com",
    plan: "Free",
    status: "Active",
    joined: "2025-07-15",
    onboardingDate: "2025-07-15",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 30,
    gender: "Female",
    height: "160 cm",
    weight: "56 kg",
    goal: "Weight Loss",
    diet: "Keto",
  },
  {
    id: 57,
    name: "Aryan Kapoor",
    email: "aryan.kapoor@example.com",
    plan: "Basic",
    status: "Active",
    joined: "2025-05-20",
    onboardingDate: "2025-05-20",
    payments: 1,
    paymentMode: "PayPal",
    planExpiry: "2026-05-20",
    age: 32,
    gender: "Male",
    height: "175 cm",
    weight: "80 kg",
    goal: "Fitness",
    diet: "Balanced",
  },
  {
    id: 58,
    name: "Shivani Nair",
    email: "shivani.nair@example.com",
    plan: "Premium",
    status: "Active",
    joined: "2025-03-15",
    onboardingDate: "2025-03-15",
    payments: 4,
    paymentMode: "Stripe",
    planExpiry: "2026-03-15",
    age: 28,
    gender: "Female",
    height: "158 cm",
    weight: "55 kg",
    goal: "Immunity Boost",
    diet: "Vegetarian",
  },
  {
    id: 59,
    name: "Rohit Sharma",
    email: "rohit.sharma@example.com",
    plan: "Free",
    status: "Active",
    joined: "2025-07-01",
    onboardingDate: "2025-07-01",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 35,
    gender: "Male",
    height: "179 cm",
    weight: "84 kg",
    goal: "Muscle Gain",
    diet: "High Protein",
  },
  {
    id: 60,
    name: "Nisha Patel",
    email: "nisha.patel@example.com",
    plan: "Basic",
    status: "Active",
    joined: "2025-06-10",
    onboardingDate: "2025-06-10",
    payments: 1,
    paymentMode: "PayPal",
    planExpiry: "2026-06-10",
    age: 29,
    gender: "Female",
    height: "161 cm",
    weight: "57 kg",
    goal: "Weight Loss",
    diet: "Paleo",
  },
  {
    id: 61,
    name: "Vikrant Singh",
    email: "vikrant.singh@example.com",
    plan: "Premium",
    status: "Active",
    joined: "2025-02-20",
    onboardingDate: "2025-02-20",
    payments: 5,
    paymentMode: "Stripe",
    planExpiry: "2026-02-20",
    age: 33,
    gender: "Male",
    height: "177 cm",
    weight: "81 kg",
    goal: "Fitness",
    diet: "Balanced",
  },
  {
    id: 62,
    name: "Jaya Menon",
    email: "jaya.menon@example.com",
    plan: "Free",
    status: "Active",
    joined: "2025-07-12",
    onboardingDate: "2025-07-12",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 27,
    gender: "Female",
    height: "160 cm",
    weight: "56 kg",
    goal: "Immunity Boost",
    diet: "Vegan",
  },
  {
    id: 63,
    name: "Arvind Kumar",
    email: "arvind.kumar@example.com",
    plan: "Basic",
    status: "Active",
    joined: "2025-05-25",
    onboardingDate: "2025-05-25",
    payments: 1,
    paymentMode: "PayPal",
    planExpiry: "2026-05-25",
    age: 34,
    gender: "Male",
    height: "176 cm",
    weight: "80 kg",
    goal: "Muscle Gain",
    diet: "High Protein",
  },
  {
    id: 64,
    name: "Smita Desai",
    email: "smita.desai@example.com",
    plan: "Premium",
    status: "Inactive",
    joined: "2025-03-10",
    onboardingDate: "2025-03-10",
    payments: 4,
    paymentMode: "Stripe",
    planExpiry: "2025-09-10",
    age: 30,
    gender: "Female",
    height: "159 cm",
    weight: "55 kg",
    goal: "Weight Loss",
    diet: "Keto",
  },
  {
    id: 65,
    name: "Naveen Reddy",
    email: "naveen.reddy@example.com",
    plan: "Free",
    status: "Active",
    joined: "2025-06-15",
    onboardingDate: "2025-06-15",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 36,
    gender: "Male",
    height: "180 cm",
    weight: "85 kg",
    goal: "Fitness",
    diet: "Balanced",
  },
  {
    id: 66,
    name: "Radhika Sharma",
    email: "radhika.sharma@example.com",
    plan: "Basic",
    status: "Active",
    joined: "2025-04-20",
    onboardingDate: "2025-04-20",
    payments: 2,
    paymentMode: "PayPal",
    planExpiry: "2026-04-20",
    age: 28,
    gender: "Female",
    height: "161 cm",
    weight: "57 kg",
    goal: "Immunity Boost",
    diet: "Vegan",
  },
  {
    id: 67,
    name: "Saket Joshi",
    email: "saket.joshi@example.com",
    plan: "Premium",
    status: "Active",
    joined: "2025-02-15",
    onboardingDate: "2025-02-15",
    payments: 5,
    paymentMode: "Stripe",
    planExpiry: "2026-02-15",
    age: 33,
    gender: "Male",
    height: "178 cm",
    weight: "82 kg",
    goal: "Muscle Gain",
    diet: "High Protein",
  },
  {
    id: 68,
    name: "Tanya Gupta",
    email: "tanya.gupta@example.com",
    plan: "Free",
    status: "Active",
    joined: "2025-07-05",
    onboardingDate: "2025-07-05",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 29,
    gender: "Female",
    height: "160 cm",
    weight: "56 kg",
    goal: "Weight Loss",
    diet: "Paleo",
  },
  {
    id: 69,
    name: "Mayank Singh",
    email: "mayank.singh@example.com",
    plan: "Basic",
    status: "Active",
    joined: "2025-06-01",
    onboardingDate: "2025-06-01",
    payments: 1,
    paymentMode: "PayPal",
    planExpiry: "2026-06-01",
    age: 31,
    gender: "Male",
    height: "177 cm",
    weight: "81 kg",
    goal: "Fitness",
    diet: "Balanced",
  },
  {
    id: 70,
    name: "Pallavi Nair",
    email: "pallavi.nair@example.com",
    plan: "Premium",
    status: "Active",
    joined: "2025-03-20",
    onboardingDate: "2025-03-20",
    payments: 4,
    paymentMode: "Stripe",
    planExpiry: "2026-03-20",
    age: 27,
    gender: "Female",
    height: "158 cm",
    weight: "55 kg",
    goal: "Immunity Boost",
    diet: "Vegetarian",
  },
  {
    id: 71,
    name: "Ankit Sharma",
    email: "ankit.sharma@example.com",
    plan: "Free",
    status: "Active",
    joined: "2025-07-10",
    onboardingDate: "2025-07-10",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 34,
    gender: "Male",
    height: "179 cm",
    weight: "83 kg",
    goal: "Muscle Gain",
    diet: "High Protein",
  },
  {
    id: 72,
    name: "Shruti Patel",
    email: "shruti.patel@example.com",
    plan: "Basic",
    status: "Active",
    joined: "2025-05-15",
    onboardingDate: "2025-05-15",
    payments: 1,
    paymentMode: "PayPal",
    planExpiry: "2026-05-15",
    age: 30,
    gender: "Female",
    height: "160 cm",
    weight: "56 kg",
    goal: "Weight Loss",
    diet: "Keto",
  },
  {
    id: 73,
    name: "Vishal Kumar",
    email: "vishal.kumar@example.com",
    plan: "Premium",
    status: "Active",
    joined: "2025-02-25",
    onboardingDate: "2025-02-25",
    payments: 5,
    paymentMode: "Stripe",
    planExpiry: "2026-02-25",
    age: 33,
    gender: "Male",
    height: "178 cm",
    weight: "82 kg",
    goal: "Fitness",
    diet: "Balanced",
  },
  {
    id: 74,
    name: "Anita Desai",
    email: "anita.desai@example.com",
    plan: "Free",
    status: "Active",
    joined: "2025-06-20",
    onboardingDate: "2025-06-20",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 28,
    gender: "Female",
    height: "161 cm",
    weight: "57 kg",
    goal: "Immunity Boost",
    diet: "Vegan",
  },
  {
    id: 75,
    name: "Rajat Singh",
    email: "rajat.singh@example.com",
    plan: "Basic",
    status: "Active",
    joined: "2025-04-10",
    onboardingDate: "2025-04-10",
    payments: 2,
    paymentMode: "PayPal",
    planExpiry: "2026-04-10",
    age: 31,
    gender: "Male",
    height: "177 cm",
    weight: "80 kg",
    goal: "Muscle Gain",
    diet: "High Protein",
  },
  {
    id: 76,
    name: "Komal Sharma",
    email: "komal.sharma@example.com",
    plan: "Premium",
    status: "Inactive",
    joined: "2025-03-15",
    onboardingDate: "2025-03-15",
    payments: 4,
    paymentMode: "Stripe",
    planExpiry: "2025-09-15",
    age: 29,
    gender: "Female",
    height: "159 cm",
    weight: "55 kg",
    goal: "Weight Loss",
    diet: "Paleo",
  },
  {
    id: 77,
    name: "Prashant Reddy",
    email: "prashant.reddy@example.com",
    plan: "Free",
    status: "Active",
    joined: "2025-07-01",
    onboardingDate: "2025-07-01",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 35,
    gender: "Male",
    height: "180 cm",
    weight: "84 kg",
    goal: "Fitness",
    diet: "Balanced",
  },
  {
    id: 78,
    name: "Rekha Menon",
    email: "rekha.menon@example.com",
    plan: "Basic",
    status: "Active",
    joined: "2025-06-05",
    onboardingDate: "2025-06-05",
    payments: 1,
    paymentMode: "PayPal",
    planExpiry: "2026-06-05",
    age: 27,
    gender: "Female",
    height: "160 cm",
    weight: "56 kg",
    goal: "Immunity Boost",
    diet: "Vegan",
  },
  {
    id: 79,
    name: "Saurabh Patel",
    email: "saurabh.patel@example.com",
    plan: "Premium",
    status: "Active",
    joined: "2025-02-10",
    onboardingDate: "2025-02-10",
    payments: 5,
    paymentMode: "Stripe",
    planExpiry: "2026-02-10",
    age: 34,
    gender: "Male",
    height: "178 cm",
    weight: "82 kg",
    goal: "Muscle Gain",
    diet: "High Protein",
  },
  {
    id: 80,
    name: "Vaishali Sharma",
    email: "vaishali.sharma@example.com",
    plan: "Free",
    status: "Active",
    joined: "2025-07-15",
    onboardingDate: "2025-07-15",
    payments: 0,
    paymentMode: null,
    planExpiry: null,
    age: 30,
    gender: "Female",
    height: "161 cm",
    weight: "57 kg",
    goal: "Weight Loss",
    diet: "Keto",
  },
];

const plans = [
  { name: "Free", expiry: "Never", mode: "N/A", status: "Active" },
  {
    name: "Pro",
    expiry: "2025-12-31",
    mode: "Credit Card",
    status: "Inactive",
  },
  { name: "Premium", expiry: "2025-06-15", mode: "PayPal", status: "Inactive" },
];

const Users = () => {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [filter, setFilter] = useState("all");
  const [selectedPlan, setSelectedPlan] = useState("Free");
  const [openSection, setOpenSection] = useState("profile");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  // const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  //   console.log("usersData:", usersData);
  //   const staticToken =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXVpZCI6IjBlMjdjMTlmLWY0NGQtNGM0NS05ZDU3LWMwMzY3NmVkNmQyYyIsImVtYWlsIjoicHJhdGlrc3VydmU5OTY5QGdtYWlsLmNvbSIsInN0ZXAiOjAsImlhdCI6MTc1NDU5NDMxOSwiZXhwIjoxNzU3MTg2MzE5fQ.Kj-Bl76YwtKYG549Sf6SOHV9iqsl_1cA7tusp3zCA6Y";

  // useEffect(() => {
  //     const fetchUsers = async () => {
  //         try {
  //             const res = await axios.get("http://localhost:3000/api/user/getUsersList", {
  //                 headers: {
  //                     Authorization: `Bearer ${staticToken}`
  //                 }
  //             });
  //             setUsersData(res.data.data || []);
  //         } catch (err) {
  //             console.error("Error fetching users:", err);
  //         } finally {
  //             setLoading(false);
  //         }
  //     };

  //     fetchUsers();
  // }, []);

  const filteredUsers = usersData.filter(
    (user) =>
      (filter === "all" || user.plan.toLowerCase() === filter) &&
      user.name.toLowerCase().includes(search.toLowerCase())
  );

  //   if (loading) return <div className="p-6 text-lg">Loading users...</div>;

  // const filteredUsers = usersData.filter((user) =>
  //     (filter === "all" || user.plan.toLowerCase() === filter) &&
  //     user.name.toLowerCase().includes(search.toLowerCase())
  // );

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold text-deepIndigo">
        User Management
      </h1>

      {/* Filter + Search */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex gap-2">
          {["all", "premium", "free"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-1 ${
                filter === f
                  ? "bg-vitalGreen text-white"
                  : "border-gray-300 text-gray-600"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="relative ml-auto">
          <MdSearch className="absolute left-3 top-2.5 text-gray-400" />
          <input
            className="rounded-md border py-2 pl-10 pr-4"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Plan</th>
              <th className="px-6 py-3">Joined</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Payments</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b transition-all hover:bg-gray-50"
              >
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4 font-semibold text-vitalGreen">
                  {user.plan}
                </td>
                <td className="px-6 py-4 text-gray-500">{user.joined}</td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-700">
                  {user.payments}
                </td>
                <td className="space-x-3 px-6 py-4 text-right">
                  {/* {user.plan === "Free" && (
                    <button
                      className="text-yellow-600 hover:text-yellow-800"
                      title="Upgrade"
                    >
                      <MdUpgrade />
                    </button>
                  )} */}
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="text-blue-600 hover:text-blue-800"
                    title="View"
                  >
                    {/* <MdVisibility /> */}
                    <CiEdit />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Full Detail Modal */}
      {selectedUser && (
        <div className="bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 p-4">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl">
            <button
              className="absolute right-5 top-4 text-xl text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedUser(null)}
            >
              ✕
            </button>

            <h2 className="mb-6 text-2xl font-bold text-deepIndigo">
              {selectedUser.name}'s Profile
            </h2>

            <div className="space-y-4">
              {/* Accordion - Profile Info */}
              <div className="rounded-xl border border-gray-200 shadow-md">
                <button
                  onClick={() => toggleSection("profile")}
                  className="flex w-full items-center justify-between rounded-t-xl bg-oceanTeal p-4 text-left font-semibold text-deepIndigo focus:outline-none"
                >
                  👤 Basic & Health Info
                  <span className="text-gray-600">
                    {openSection === "profile" ? (
                      <IoChevronUpOutline />
                    ) : (
                      <IoChevronDownOutline />
                    )}
                  </span>
                </button>
                {openSection === "profile" && (
                  <div className="bg-oceanTeal p-4">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      {/* Basic Info */}
                      <div>
                        <h3 className="text-md mb-3 font-semibold text-deepIndigo">
                          Basic Info
                        </h3>
                        <div className="space-y-2 text-sm text-gray-800">
                          <p>
                            <strong>📧 Email:</strong> {selectedUser.email}
                          </p>
                          <p>
                            <strong>🧍 Gender:</strong> {selectedUser.gender}
                          </p>
                          <p>
                            <strong>🎂 Age:</strong> {selectedUser.age}
                          </p>
                          <p>
                            <strong>📆 Joined:</strong> {selectedUser.joined}
                          </p>
                          <p>
                            <strong>🚀 Onboarding:</strong>{" "}
                            {selectedUser.onboardingDate}
                          </p>
                          <p>
                            <strong>💪 Goal:</strong> {selectedUser.goal}
                          </p>
                        </div>
                      </div>
                      {/* Health Info */}
                      <div>
                        <h3 className="text-md mb-3 font-semibold text-deepIndigo">
                          📊 Health Info
                        </h3>
                        <div className="text-sm text-gray-800 sm:grid sm:grid-cols-2 sm:gap-4">
                          <p>
                            <strong>📏 Height:</strong> {selectedUser.height}
                          </p>
                          <p>
                            <strong>⚖️ Weight:</strong> {selectedUser.weight}
                          </p>
                          <p>
                            <strong>🥗 Diet:</strong> {selectedUser.diet}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion - Plan Details */}
              <div className="rounded-xl border border-gray-200 shadow-md">
                <button
                  onClick={() => toggleSection("plans")}
                  className="from-sky-50 flex w-full items-center justify-between rounded-t-xl bg-gradient-to-br to-indigo-50 p-4 text-left font-semibold text-deepIndigo focus:outline-none"
                >
                  💳 Plan Details
                  <span className="text-gray-600">
                    {openSection === "plans" ? (
                      <IoChevronUpOutline />
                    ) : (
                      <IoChevronDownOutline />
                    )}
                  </span>
                </button>
                {openSection === "plans" && (
                  <div className="bg-white p-4">
                    <div className="space-y-3">
                      {plans.map((plan) => {
                        const isSelected = selectedPlan === plan.name;
                        const isFree = plan.name === "Free";

                        return (
                          <div
                            key={plan.name}
                            className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 shadow-sm transition ${
                              isSelected
                                ? "border-amber-300 bg-amber-100"
                                : "border-gray-200 bg-white"
                            }`}
                            onClick={() =>
                              !isFree && setSelectedPlan(plan.name)
                            }
                          >
                            <div className="flex-1">
                              <p className="font-semibold">{plan.name}</p>
                              <div className="flex gap-6 text-sm">
                                <p>📅 Expiry: {plan.expiry}</p>
                                <p>💳 Mode: {plan.mode}</p>
                                <p>📌 Status: {plan.status}</p>
                              </div>
                            </div>
                            {!isFree && (
                              <input
                                type="radio"
                                name="plan"
                                value={plan.name}
                                checked={isSelected}
                                onChange={() => setSelectedPlan(plan.name)}
                                className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
