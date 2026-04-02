import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search, Newspaper } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import ImageLightbox from "@/components/ImageLightbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { fullPaperCuttingResources } from "@/components/full_paper_cutting_resources";
import heroBanner from "@/assets/pressCoverateHero.png";
const resources = [
  { title: "ग्रीन गाजियाबाद अभियान - अमर उजाला", titleHi: "ग्रीन गाजियाबाद अभियान - अमर उजाला", date: "Jul 2019", dateHi: "जुलाई 2019", excerpt: "Green Ghaziabad campaign coverage featuring Belpatra plantation drive.", excerptHi: "बेलपत्र वृक्षारोपण अभियान के साथ ग्रीन गाजियाबाद अभियान की कवरेज।", image: "./press-coverage/press-1_result.webp" },
  { title: "लोगों को भेंट किया बेलपत्र का पौधा", titleHi: "लोगों को भेंट किया बेलपत्र का पौधा", date: "Aug 2022", dateHi: "अगस्त 2022", excerpt: "Belpatra saplings distributed to people at community event.", excerptHi: "सामुदायिक कार्यक्रम में लोगों को बेलपत्र के पौधे भेंट किए गए।", image: "./press-coverage/press-3_result.webp" },
  { title: "भंडारे में पहुंचे लोगों को दिए बेल के पौधे", titleHi: "भंडारे में पहुंचे लोगों को दिए बेल के पौधे", date: "Aug 2022", dateHi: "अगस्त 2022", excerpt: "Bel saplings gifted at Bhandara event with MLA Sunil Sharma.", excerptHi: "विधायक सुनील शर्मा के साथ भंडारे में बेल के पौधे वितरित।", image: "./press-coverage/press-4_result.webp" },
  { title: "हनुमान चालीसा का पाठ किया - हिन्दुस्तान", titleHi: "हनुमान चालीसा का पाठ किया - हिन्दुस्तान", date: "Aug 2022", dateHi: "अगस्त 2022", excerpt: "Hindustan newspaper coverage of Hanuman Chalisa event with Belpatra distribution.", excerptHi: "बेलपत्र वितरण के साथ हनुमान चालीसा कार्यक्रम की हिन्दुस्तान में कवरेज।", image: "./press-coverage/press-5_result.webp" },
  { title: "बनारस नगर निगम में बेलपत्र के पौधे लगाए", titleHi: "बनारस नगर निगम में बेलपत्र के पौधे लगाए", date: "Oct 2022", dateHi: "अक्टूबर 2022", excerpt: "111 Belpatra saplings planted at Varanasi Nagar Nigam under Shivmay Bharat Abhiyan.", excerptHi: "शिवमय भारत अभियान के तहत वाराणसी नगर निगम में 111 बेलपत्र के पौधे लगाए।", image: "./press-coverage/press-6_result.webp" },
  { title: "पर्यावरण संरक्षण के साथ गौसेवा कार्यों को प्राथमिकता", titleHi: "पर्यावरण संरक्षण के साथ गौसेवा कार्यों को प्राथमिकता", date: "Feb 2023", dateHi: "फरवरी 2023", excerpt: "Prakriti Foundation meeting on environment conservation and Gau Seva priorities.", excerptHi: "पर्यावरण संरक्षण और गौसेवा प्राथमिकताओं पर प्रकृति फाउंडेशन की बैठक।", image: "./press-coverage/press-7_result.webp" },
  { title: "शिवमय दिल्ली का शुभारंभ - सांसद मनोज तिवारी", titleHi: "शिवमय दिल्ली का शुभारंभ - सांसद मनोज तिवारी", date: "Aug 2023", dateHi: "अगस्त 2023", excerpt: "MP Manoj Tiwari launches Shivmay Delhi with 21000 Belpatra plantation pledge.", excerptHi: "सांसद मनोज तिवारी ने 21000 बेलपत्र वृक्षारोपण संकल्प के साथ शिवमय दिल्ली का शुभारंभ किया।", image: "./press-coverage/press-8_result.webp" },
  { title: "बेलपत्र का पौधा रोपण - जन सागर टुडे", titleHi: "बेलपत्र का पौधा रोपण - जन सागर टुडे", date: "Aug 2023", dateHi: "अगस्त 2023", excerpt: "Jan Sagar Today coverage of Belpatra plantation with MP Manoj Tiwari.", excerptHi: "सांसद मनोज तिवारी के साथ बेलपत्र वृक्षारोपण की जन सागर टुडे में कवरेज।", image: "./press-coverage/press-9_result.webp" },
  { title: "संसदीय क्षेत्र में शिवमय दिल्ली की शुरुआत", titleHi: "संसदीय क्षेत्र में शिवमय दिल्ली की शुरुआत", date: "Aug 2023", dateHi: "अगस्त 2023", excerpt: "Shivmay Delhi initiative launched in parliamentary constituency.", excerptHi: "संसदीय क्षेत्र में शिवमय दिल्ली पहल की शुरुआत।", image: "./press-coverage/press-10_result.webp" },
  { title: "बालिका ही समाज की नींव है: पांडेय", titleHi: "बालिका ही समाज की नींव है: पांडेय", date: "Nov 2006", dateHi: "नवंबर 2006", excerpt: "Dainik Jagran coverage of girl child education awareness campaign by Pandey.", excerptHi: "पांडेय द्वारा बालिका शिक्षा जागरूकता अभियान की दैनिक जागरण में कवरेज।", image: "./press-coverage/press-11_result.webp" },
  { title: "बालिका ही समाज की नींव - दैनिक जागरण", titleHi: "बालिका ही समाज की नींव - दैनिक जागरण", date: "Nov 2006", dateHi: "नवंबर 2006", excerpt: "Girl child is the foundation of society - social awareness event.", excerptHi: "बालिका समाज की नींव है - सामाजिक जागरूकता कार्यक्रम।", image: "./press-coverage/press-12_result.webp" },
  { title: "पेड़ों की रक्षा के लिए अनशन जारी", titleHi: "पेड़ों की रक्षा के लिए अनशन जारी", date: "Dec 2017", dateHi: "दिसंबर 2017", excerpt: "DP Pandey's hunger strike to save trees at Atal Chowk, Vasundhara.", excerptHi: "वसुंधरा अटल चौक पर पेड़ों की रक्षा के लिए डीपी पांडेय का अनशन।", image: "./press-coverage/press-13_result.webp" },
  { title: "महाशिवरात्रि पर्व की तैयारियां - शांतिदूत", titleHi: "महाशिवरात्रि पर्व की तैयारियां - शांतिदूत", date: "Mar 2019", dateHi: "मार्च 2019", excerpt: "Shanti Doot newspaper coverage of Mahashivratri celebrations.", excerptHi: "शांतिदूत अखबार में महाशिवरात्रि उत्सव की कवरेज।", image: "./press-coverage/press-14_result.webp" },
  { title: "डॉ. राजेंद्र प्रसाद जन्मभूमि पर कार्यक्रम", titleHi: "डॉ. राजेंद्र प्रसाद जन्मभूमि पर कार्यक्रम", date: "Mar 2019", dateHi: "मार्च 2019", excerpt: "Event at Dr. Rajendra Prasad's birthplace.", excerptHi: "डॉ. राजेंद्र प्रसाद की जन्मभूमि पर कार्यक्रम।", image: "./press-coverage/press-15_result.webp" },
  { title: "आने वाले बच्चों के भविष्य के लिए पेड़ लगाएं: प्रकृति रूपा", titleHi: "आने वाले बच्चों के भविष्य के लिए पेड़ लगाएं: प्रकृति रूपा", date: "Apr 2019", dateHi: "अप्रैल 2019", excerpt: "Plant trees for children's future - 51 Belpatra saplings distributed.", excerptHi: "बच्चों के भविष्य के लिए पेड़ लगाएं - 51 बेलपत्र के पौधे वितरित।", image: "./press-coverage/press-16_result.webp" },
  { title: "हिन्दू नववर्ष पर डीपी पाण्डेय ने बांटे पौधे", titleHi: "हिन्दू नववर्ष पर डीपी पाण्डेय ने बांटे पौधे", date: "Apr 2019", dateHi: "अप्रैल 2019", excerpt: "DP Pandey distributed saplings on Hindu New Year at Vasundhara.", excerptHi: "वसुंधरा में हिन्दू नववर्ष पर डीपी पांडेय ने पौधे वितरित किए।", image: "./press-coverage/press-17_result.webp" },
  { title: "वृक्षारोपण अभियान - हिन्द आत्मा", titleHi: "वृक्षारोपण अभियान - हिन्द आत्मा", date: "Apr 2019", dateHi: "अप्रैल 2019", excerpt: "Plantation drive coverage in Hind Atma newspaper.", excerptHi: "हिन्द आत्मा अखबार में वृक्षारोपण अभियान की कवरेज।", image: "./press-coverage/press-18_result.webp" },
  { title: "पृथ्वी दिवस पर हवन यज्ञ का आयोजन", titleHi: "पृथ्वी दिवस पर हवन यज्ञ का आयोजन", date: "Apr 2019", dateHi: "अप्रैल 2019", excerpt: "Earth Day Havan Yagya organized for environmental awareness.", excerptHi: "पर्यावरण जागरूकता के लिए पृथ्वी दिवस पर हवन यज्ञ का आयोजन।", image: "./press-coverage/press-19_result.webp" },
  { title: "पृथ्वी दिवस पर हवन यज्ञ - विस्तृत कवरेज", titleHi: "पृथ्वी दिवस पर हवन यज्ञ - विस्तृत कवरेज", date: "Apr 2019", dateHi: "अप्रैल 2019", excerpt: "Detailed coverage of Earth Day Havan Yagya ceremony.", excerptHi: "पृथ्वी दिवस हवन यज्ञ समारोह की विस्तृत कवरेज।", image: "./press-coverage/press-20_result.webp" },
  { title: "पृथ्वी दिवस पर कार्यक्रम का आयोजन", titleHi: "पृथ्वी दिवस पर कार्यक्रम का आयोजन", date: "Apr 2019", dateHi: "अप्रैल 2019", excerpt: "Earth Day program organized with plantation and awareness activities.", excerptHi: "वृक्षारोपण और जागरूकता गतिविधियों के साथ पृथ्वी दिवस कार्यक्रम।", image: "./press-coverage/press-21_result.webp" },
  { title: "युवक-युवती परिचय सम्मेलन: पंडित नरेश पाल कौशिक", titleHi: "युवक-युवती परिचय सम्मेलन: पंडित नरेश पाल कौशिक", date: "Apr 2019", dateHi: "अप्रैल 2019", excerpt: "Community gathering organized with environmental awareness message.", excerptHi: "पर्यावरण जागरूकता संदेश के साथ सामुदायिक सभा का आयोजन।", image: "./press-coverage/press-22_result.webp" },
  { title: "पृथ्वी दिवस के उपलक्ष में यज्ञ किया", titleHi: "पृथ्वी दिवस के उपलक्ष में यज्ञ किया", date: "Apr 2019", dateHi: "अप्रैल 2019", excerpt: "Yagya performed on the occasion of Earth Day with Prakriti Satyagrah Mission.", excerptHi: "प्रकृति सत्याग्रह मिशन के साथ पृथ्वी दिवस पर यज्ञ का आयोजन।", image: "./press-coverage/press-23_result.webp" },
  { title: "प्रकृति रूपा भाई हिंडन को निर्मल बनाने के लिए अनशन", titleHi: "प्रकृति रूपा भाई हिंडन को निर्मल बनाने के लिए अनशन", date: "May 2019", dateHi: "मई 2019", excerpt: "Prakriti Rupa Bhai's fast to clean Hindon river.", excerptHi: "हिंडन नदी को स्वच्छ बनाने के लिए प्रकृति रूपा भाई का अनशन।", image: "./press-coverage/press-24_result.webp" },
  { title: "मां हिंडन में दुग्धाभिषेक, स्वच्छ बनाने के लिये यज्ञ", titleHi: "मां हिंडन में दुग्धाभिषेक, स्वच्छ बनाने के लिये यज्ञ", date: "May 2019", dateHi: "मई 2019", excerpt: "Milk offering and Yagya at Hindon river for cleanliness drive.", excerptHi: "हिंडन नदी पर स्वच्छता अभियान के लिए दुग्धाभिषेक और यज्ञ।", image: "./press-coverage/press-25_result.webp" },
  { title: "मां हिंडन में दुग्धाभिषेक - विस्तृत", titleHi: "मां हिंडन में दुग्धाभिषेक - विस्तृत", date: "May 2019", dateHi: "मई 2019", excerpt: "Detailed coverage of Hindon river cleanliness campaign.", excerptHi: "हिंडन नदी स्वच्छता अभियान की विस्तृत कवरेज।", image: "./press-coverage/press-26_result.webp" },
  { title: "आठवीं बटालियन एनडीआरएफ में वृक्षारोपण", titleHi: "आठवीं बटालियन एनडीआरएफ में वृक्षारोपण", date: "Jun 2019", dateHi: "जून 2019", excerpt: "Tree plantation at 8th Battalion NDRF.", excerptHi: "आठवीं बटालियन एनडीआरएफ में वृक्षारोपण।", image: "./press-coverage/press-27_result.webp" },
  { title: "इंदिरापुरम माध्यमिक विद्यालय में पौधारोपण", titleHi: "इंदिरापुरम माध्यमिक विद्यालय में पौधारोपण", date: "Jul 2019", dateHi: "जुलाई 2019", excerpt: "Plantation drive at Indirapuram Secondary School.", excerptHi: "इंदिरापुरम माध्यमिक विद्यालय में पौधारोपण अभियान।", image: "./press-coverage/press-28_result.webp" },
  { title: "विद्यालय में वृक्षारोपण कर पर्यावरण संरक्षण को बढ़ावा", titleHi: "विद्यालय में वृक्षारोपण कर पर्यावरण संरक्षण को बढ़ावा", date: "Jul 2019", dateHi: "जुलाई 2019", excerpt: "School plantation drive promoting environmental conservation.", excerptHi: "पर्यावरण संरक्षण को बढ़ावा देने के लिए विद्यालय में वृक्षारोपण।", image: "./press-coverage/press-29_result.webp" },
  { title: "सामुदायिक वृक्षारोपण अभियान", titleHi: "सामुदायिक वृक्षारोपण अभियान", date: "Jul 2019", dateHi: "जुलाई 2019", excerpt: "Community plantation drive with local residents.", excerptHi: "स्थानीय निवासियों के साथ सामुदायिक वृक्षारोपण अभियान।", image: "./press-coverage/press-30_result.webp" },
  { title: "लायन्स क्लब इंदिरापुरम द्वारा पौधारोपण", titleHi: "लायन्स क्लब इंदिरापुरम द्वारा पौधारोपण", date: "Jul 2019", dateHi: "जुलाई 2019", excerpt: "Lions Club Indirapuram plantation drive with Prakriti Satyagrah Mission.", excerptHi: "प्रकृति सत्याग्रह मिशन के साथ लायन्स क्लब इंदिरापुरम का पौधारोपण।", image: "./press-coverage/press-31_result.webp" },
  { title: "सड़क के किनारे चलाया गया पौधारोपड़ अभियान", titleHi: "सड़क के किनारे चलाया गया पौधारोपड़ अभियान", date: "Jul 2019", dateHi: "जुलाई 2019", excerpt: "Roadside plantation campaign with school children.", excerptHi: "स्कूली बच्चों के साथ सड़क किनारे पौधारोपण अभियान।", image: "./press-coverage/press-32_result.webp" },
  { title: "पर्यावरण की सुरक्षा सबका दायित्व: शालू पाण्डेय", titleHi: "पर्यावरण की सुरक्षा सबका दायित्व: शालू पाण्डेय", date: "Jul 2019", dateHi: "जुलाई 2019", excerpt: "Environmental protection is everyone's responsibility - Shalu Pandey.", excerptHi: "पर्यावरण की सुरक्षा सबका दायित्व है - शालू पाण्डेय।", image: "./press-coverage/press-33_result.webp" },
  { title: "प्रकृति की रक्षा कर आधुनिक भारत के निर्माता बनें", titleHi: "प्रकृति की रक्षा कर आधुनिक भारत के निर्माता बनें", date: "Jul 2019", dateHi: "जुलाई 2019", excerpt: "Protect nature and become builders of modern India - Prakriti Rupa Bhai.", excerptHi: "प्रकृति की रक्षा कर आधुनिक भारत के निर्माता बनें - प्रकृति रूपा भाई।", image: "./press-coverage/press-34_result.webp" },
  { title: "प्रकृति दिवस पर किया वृक्षारोपण", titleHi: "प्रकृति दिवस पर किया वृक्षारोपण", date: "Jul 2019", dateHi: "जुलाई 2019", excerpt: "Tree plantation on Prakriti Divas (Nature Day).", excerptHi: "प्रकृति दिवस पर वृक्षारोपण किया गया।", image: "./press-coverage/press-35_result.webp" },
  { title: "प्रदूषण हमारी जिन्दगी पर भारी: प्रकृति रूपा", titleHi: "प्रदूषण हमारी जिन्दगी पर भारी: प्रकृति रूपा", date: "Aug 2019", dateHi: "अगस्त 2019", excerpt: "Pollution is heavy on our lives - Bel and Tulsi saplings distributed.", excerptHi: "प्रदूषण हमारी जिन्दगी पर भारी - बेल और तुलसी के पौधे वितरित।", image: "./press-coverage/press-36_result.webp" },
  { title: "प्रकृति रूपा भाई डीपी पांडेय प्रेरणा पुरस्कार-2019 से सम्मानित", titleHi: "प्रकृति रूपा भाई डीपी पांडेय प्रेरणा पुरस्कार-2019 से सम्मानित", date: "Aug 2019", dateHi: "अगस्त 2019", excerpt: "DP Pandey honored with Prerna Puraskar 2019.", excerptHi: "डीपी पांडेय को प्रेरणा पुरस्कार-2019 से सम्मानित किया गया।", image: "./press-coverage/press-37_result.webp" },
  { title: "प्रकृति फाउंडेशन ने की हवा, जल व भोजन पर चर्चा", titleHi: "प्रकृति फाउंडेशन ने की हवा, जल व भोजन पर चर्चा", date: "Nov 2019", dateHi: "नवंबर 2019", excerpt: "Prakriti Foundation discussion on air, water, and food.", excerptHi: "प्रकृति फाउंडेशन ने हवा, जल और भोजन पर चर्चा की।", image: "./press-coverage/press-38_result.webp" },
  { title: "डॉ. राजेन्द्र प्रसाद को दी श्रद्धांजलि", titleHi: "डॉ. राजेन्द्र प्रसाद को दी श्रद्धांजलि", date: "Dec 2019", dateHi: "दिसंबर 2019", excerpt: "Tribute to Dr. Rajendra Prasad on his Jayanti.", excerptHi: "डॉ. राजेन्द्र प्रसाद की जयंती पर श्रद्धांजलि।", image: "./press-coverage/press-39_result.webp" },
  { title: "वृक्ष और हनुमान चालीसा बैंक की स्थापना", titleHi: "वृक्ष और हनुमान चालीसा बैंक की स्थापना", date: "Feb 2020", dateHi: "फरवरी 2020", excerpt: "Establishment of Tree and Hanuman Chalisa Bank.", excerptHi: "वृक्ष और हनुमान चालीसा बैंक की स्थापना।", image: "./press-coverage/press-40_result.webp" },
  { title: "प्रकृति पौधशाला में हवन यज्ञ का आयोजन", titleHi: "प्रकृति पौधशाला में हवन यज्ञ का आयोजन", date: "Mar 2020", dateHi: "मार्च 2020", excerpt: "Havan Yagya and Hanuman Chalisa at Prakriti Paudhshala.", excerptHi: "प्रकृति पौधशाला में हवन यज्ञ और हनुमान चालीसा पाठ।", image: "./press-coverage/press-41_result.webp" },
  { title: "प्रकृति पौधशाला में हनुमान चालीसा पाठ व हवन यज्ञ", titleHi: "प्रकृति पौधशाला में हनुमान चालीसा पाठ व हवन यज्ञ", date: "Jun 2020", dateHi: "जून 2020", excerpt: "Hanuman Chalisa and Havan at Prakriti Paudhshala, Vasundhara during COVID.", excerptHi: "कोविड काल में वसुंधरा प्रकृति पौधशाला में हनुमान चालीसा और हवन।", image: "./press-coverage/press-42_result.webp" },
  { title: "पौधे लगाकर आने वाली पीढ़ी को दे बेहतर उपहार", titleHi: "पौधे लगाकर आने वाली पीढ़ी को दे बेहतर उपहार", date: "Jul 2020", dateHi: "जुलाई 2020", excerpt: "Plant trees to gift a better future - Rotary Club & Prakriti Foundation.", excerptHi: "पौधे लगाकर आने वाली पीढ़ी को बेहतर उपहार दें - रोटरी क्लब व प्रकृति फाउंडेशन।", image: "./press-coverage/press-43_result.webp" },
  { title: "प्रकृति सत्याग्रह मिशन के तहत पौधारोपण - हिन्द आत्मा", titleHi: "प्रकृति सत्याग्रह मिशन के तहत पौधारोपण - हिन्द आत्मा", date: "Jul 2020", dateHi: "जुलाई 2020", excerpt: "Plantation under Prakriti Satyagrah Mission with Maitri Foundation.", excerptHi: "मैत्री फाउंडेशन के साथ प्रकृति सत्याग्रह मिशन के तहत पौधारोपण।", image: "./press-coverage/press-44_result.webp" },
  { title: "कोरोना के नाश के लिये यज्ञ व हनुमान चालीसा - हिन्द आत्मा", titleHi: "कोरोना के नाश के लिये यज्ञ व हनुमान चालीसा - हिन्द आत्मा", date: "Sep 2020", dateHi: "सितंबर 2020", excerpt: "Yagya and Hanuman Chalisa for COVID relief at Prakriti Paudhshala.", excerptHi: "प्रकृति पौधशाला में कोरोना निवारण के लिए यज्ञ और हनुमान चालीसा।", image: "./press-coverage/press-45_result.webp" },
  { title: "सर्वोदय शांतिदूत - प्रकृति फाउंडेशन विशेष अंक", titleHi: "सर्वोदय शांतिदूत - प्रकृति फाउंडेशन विशेष अंक", date: "Sep 2020", dateHi: "सितंबर 2020", excerpt: "Sarvoday Shantidoot special edition featuring Prakriti Foundation.", excerptHi: "प्रकृति फाउंडेशन पर सर्वोदय शांतिदूत का विशेष अंक।", image: "./press-coverage/press-46_result.webp" },
  { title: "शांतिदूत समाचार पत्र - विस्तृत कवरेज", titleHi: "शांतिदूत समाचार पत्र - विस्तृत कवरेज", date: "Sep 2020", dateHi: "सितंबर 2020", excerpt: "Full page Shantidoot newspaper coverage.", excerptHi: "शांतिदूत समाचार पत्र की पूर्ण पृष्ठ कवरेज।", image: "./press-coverage/press-47_result.webp" },
  { title: "प्रकृति फाउंडेशन ने किया हनुमान चालीसा पाठ - शांतिदूत", titleHi: "प्रकृति फाउंडेशन ने किया हनुमान चालीसा पाठ - शांतिदूत", date: "Sep 2020", dateHi: "सितंबर 2020", excerpt: "Shantidoot coverage of Hanuman Chalisa recitation by Prakriti Foundation.", excerptHi: "प्रकृति फाउंडेशन द्वारा हनुमान चालीसा पाठ की शांतिदूत में कवरेज।", image: "./press-coverage/press-48_result.webp" },
  { title: "प्रकृति रूपा भाई लगायेंगे जिले में एक लाख बेल पत्र के पौधे", titleHi: "प्रकृति रूपा भाई लगायेंगे जिले में एक लाख बेल पत्र के पौधे", date: "Oct 2020", dateHi: "अक्टूबर 2020", excerpt: "Prakriti Rupa Bhai to plant one lakh Belpatra saplings in district.", excerptHi: "प्रकृति रूपा भाई जिले में एक लाख बेलपत्र के पौधे लगाएंगे।", image: "./press-coverage/press-49_result.webp" },
  { title: "प्रकृति फाउंडेशन द्वारा 501 बेलपत्र के पौधे अयोध्या धाम भेजे", titleHi: "प्रकृति फाउंडेशन द्वारा 501 बेलपत्र के पौधे अयोध्या धाम भेजे", date: "Feb 2021", dateHi: "फरवरी 2021", excerpt: "501 Belpatra saplings sent to Ram Janmabhoomi Ayodhya Dham.", excerptHi: "राम जन्मभूमि अयोध्या धाम को 501 बेलपत्र के पौधे भेजे गए।", image: "./press-coverage/press-50_result.webp" },
  { title: "प्रकृति पौधशाला में पर्यावरण शुद्धता के लिए यज्ञ", titleHi: "प्रकृति पौधशाला में पर्यावरण शुद्धता के लिए यज्ञ", date: "Mar 2021", dateHi: "मार्च 2021", excerpt: "Yagya for environmental purification at Prakriti Paudhshala.", excerptHi: "प्रकृति पौधशाला में पर्यावरण शुद्धता के लिए यज्ञ।", image: "./press-coverage/press-51_result.webp" },
  { title: "11 करोड़ बेल पत्र के पौधे लगाएगा शिवमय भारत मिशन", titleHi: "11 करोड़ बेल पत्र के पौधे लगाएगा शिवमय भारत मिशन", date: "Apr 2021", dateHi: "अप्रैल 2021", excerpt: "Shivmay Bharat Mission pledges to plant 11 crore Belpatra saplings.", excerptHi: "शिवमय भारत मिशन 11 करोड़ बेलपत्र के पौधे लगाने का संकल्प।", image: "./press-coverage/press-52_result.webp" },
  { title: "11 करोड़ पौधे के लक्ष्य को पूरा करने हेतु शिव भक्तों ने संकल्प लिया", titleHi: "11 करोड़ पौधे के लक्ष्य को पूरा करने हेतु शिव भक्तों ने संकल्प लिया", date: "Apr 2021", dateHi: "अप्रैल 2021", excerpt: "Shiv devotees pledge to fulfill 11 crore plantation target.", excerptHi: "शिव भक्तों ने 11 करोड़ पौधारोपण लक्ष्य पूरा करने का संकल्प लिया।", image: "./press-coverage/press-53_result.webp" },
  { title: "देशभर में 11 करोड़ बेलपत्र पौधे लगाए जाएंगे: पांडे", titleHi: "देशभर में 11 करोड़ बेलपत्र पौधे लगाए जाएंगे: पांडे", date: "Apr 2021", dateHi: "अप्रैल 2021", excerpt: "11 crore Belpatra saplings to be planted across the country - Pandey.", excerptHi: "देशभर में 11 करोड़ बेलपत्र पौधे लगाए जाएंगे - पांडे।", image: "./press-coverage/press-54_result.webp" },
  { title: "विश्व पर्यावरण दिवस पर शिवमय भारत मिशन के तहत पौधारोपण", titleHi: "विश्व पर्यावरण दिवस पर शिवमय भारत मिशन के तहत पौधारोपण", date: "Jun 2021", dateHi: "जून 2021", excerpt: "Plantation on World Environment Day under Shivmay Bharat Mission.", excerptHi: "विश्व पर्यावरण दिवस पर शिवमय भारत मिशन के तहत पौधारोपण।", image: "./press-coverage/press-55_result.webp" },
  { title: "बीस साल पुराने पेड़ को बचाने के लिए प्रकृति प्रेमी ने लगाई गुहार", titleHi: "बीस साल पुराने पेड़ को बचाने के लिए प्रकृति प्रेमी ने लगाई गुहार", date: "Jun 2021", dateHi: "जून 2021", excerpt: "Nature lover appeals to save 20-year-old tree.", excerptHi: "बीस साल पुराने पेड़ को बचाने के लिए प्रकृति प्रेमी की गुहार।", image: "./press-coverage/press-56_result.webp" },
  { title: "पीपल का पौधा लगाने से पितर देवता तुष्ट होते हैं", titleHi: "पीपल का पौधा लगाने से पितर देवता तुष्ट होते हैं", date: "Sep 2021", dateHi: "सितंबर 2021", excerpt: "Planting Peepal tree pleases ancestors - spiritual and environmental message.", excerptHi: "पीपल का पौधा लगाने से पितर देवता तुष्ट होते हैं - आध्यात्मिक व पर्यावरणीय संदेश।", image: "./press-coverage/press-57_result.webp" },
  { title: "प्रकृति फाउंडेशन के मुख्य संरक्षक का 71वां जन्मदिन मनाया", titleHi: "प्रकृति फाउंडेशन के मुख्य संरक्षक का 71वां जन्मदिन मनाया", date: "Sep 2021", dateHi: "सितंबर 2021", excerpt: "71st birthday celebration of Prakriti Foundation's chief patron.", excerptHi: "प्रकृति फाउंडेशन के मुख्य संरक्षक का 71वां जन्मदिन मनाया।", image: "./press-coverage/press-58_result.webp" },
  { title: "श्रीमहंत नारायण गिरि को निमंत्रण कार्ड दिया", titleHi: "श्रीमहंत नारायण गिरि को निमंत्रण कार्ड दिया", date: "Jul 2022", dateHi: "जुलाई 2022", excerpt: "Invitation card given to Shreemahant Narayan Giri for Belpatra Mahotsav.", excerptHi: "बेलपत्र महोत्सव के लिए श्रीमहंत नारायण गिरि को निमंत्रण कार्ड दिया।", image: "./press-coverage/press-59_result.webp" },
  { title: "शिवमय भारत मिशन - एकता ज्योति कवरेज", titleHi: "शिवमय भारत मिशन - एकता ज्योति कवरेज", date: "Jul 2022", dateHi: "जुलाई 2022", excerpt: "Ekta Jyoti coverage of Shivmay Bharat Mission and Hanuman Chalisa recitation.", excerptHi: "शिवमय भारत मिशन और हनुमान चालीसा पाठ की एकता ज्योति में कवरेज।", image: "./press-coverage/press-60_result.webp" },
  ...fullPaperCuttingResources,
];

const ITEMS_PER_PAGE = 8; // First page 8 items, can increase later

const ResourcesPage = () => {
  const [search, setSearch] = useState("");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const { t } = useLanguage();

  const filtered = resources.filter((r) =>
    t(r.title, r.titleHi).toLowerCase().includes(search.toLowerCase())
  );

  const visibleItems = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const lightboxImages = visibleItems.map((r) => ({
    src: r.image,
    alt: t(r.title, r.titleHi),
  }));

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 md:pt-20">
        <PageHero title={t("Press Coverage", "प्रेस कवरेज")} subtitle={t("Paper cuttings, news features, and media recognition of our environmental work.", "हमारे पर्यावरणीय कार्य की अखबार कटिंग, समाचार फीचर और मीडिया मान्यता।")} image={heroBanner} />

        {/* Paper Cuttings Grid */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {visibleItems.map((r, i) => (
                <motion.div
                  key={t(r.title, r.titleHi)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: (i % ITEMS_PER_PAGE) * 0.05 }}
                  className="rounded-lg overflow-hidden group relative aspect-[3/3] cursor-pointer"
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={r.image} alt={t(r.title, r.titleHi)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/75 transition-all duration-300 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        <Newspaper className="w-4 h-4 text-accent" />
                        <span className="text-xs text-primary-foreground/70">{t(r.date, r.dateHi)}</span>
                      </div>
                      <h3 className="font-serif text-base text-primary-foreground mb-2 leading-snug">{t(r.title, r.titleHi)}</h3>
                      <p className="text-primary-foreground/70 text-sm leading-relaxed">{t(r.excerpt, r.excerptHi)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground"><p>{t("No articles found. Try a different search.", "कोई लेख नहीं मिला। अलग खोज आज़माएं।")}</p></div>
            )}
            {hasMore && (
              <div className="text-center mt-10">
                <Button size="lg" onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}>
                  {t(`View More (${filtered.length - visibleCount} remaining)`, `और देखें (${filtered.length - visibleCount} शेष)`)}
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 md:py-20 bg-primary">
          <div className="container text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="font-serif text-3xl text-primary-foreground mb-4">{t("Stay Informed", "जानकारी रखें")}</h2>
              <p className="text-primary-foreground/70 max-w-md mx-auto mb-6">{t("Subscribe to our newsletter for the latest news and updates.", "नवीनतम समाचार और अपडेट के लिए हमारे न्यूज़लेटर की सदस्यता लें।")}</p>
              <NewsletterForm containerClassName="max-w-md mx-auto" />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />

      <ImageLightbox
        images={lightboxImages}
        selectedIndex={selectedImage}
        onClose={() => setSelectedImage(null)}
        onNavigate={setSelectedImage}
      />
    </div>
  );
};

export default ResourcesPage;

