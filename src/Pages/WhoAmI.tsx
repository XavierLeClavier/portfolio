import { FaBriefcase, FaHeart } from "react-icons/fa";
import { TbStarsFilled } from "react-icons/tb";

import xavchef from "../img/xavchef.jpg";
import xavoile from "../img/xavoile.jpg";
import xavsupersympose from "../img/xavsupersympose.jpg";
import nuitinfo from "../img/nuitinfo.jpg";

export default function WhoAmI() {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      {/* Header section with photo, name and description */}
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <div className="mb-6">
          <img
            src={xavsupersympose}
            alt="Xavier's Image"
            className="w-48 h-48 rounded-full mx-auto border-4 border-purple-500 object-cover"
          />
        </div>
        <h1 className="text-4xl font-bold mb-2 text-purple-400">
          Xavier Clavier
        </h1>
        <p className="text-xl text-gray-100">
          Data Analyst & Aspiring Data Engineer
        </p>
        <div className="mt-6 max-w-2xl mx-auto">
          <p className="text-gray-100">
            I take great pleasure in transforming complex data into actionable
            insights to drive business decisions. With expertise in data
            visualization and programming, I'm passionate about solving
            real-world problems through data and machine learning.
          </p>
        </div>
      </div>

      {/* Work Experience */}
      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FaBriefcase className="text-purple-500 mr-3" />
          <span className="border-b-2 border-purple-500 pb-1">
            Work Experience
          </span>
        </h2>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between mb-1">
            <h3 className="text-xl font-semibold text-purple-300">
              Data Analyst
            </h3>
            <span className="text-gray-400">April 2024 - Present</span>
          </div>
          <div className="text-gray-500 mb-2">
            LYSARC - The Lymphoma Academic Research Organisation
          </div>
          <ul className="text-gray-100 list-disc pl-5 space-y-2">
            <li>
              Extracted, transformed and cleaned complex healthcare data using
              SAS and SQL, ensuring high data quality and consistency
            </li>
            <li>
              Designed and developed interactive dashboards and performance
              indicators in Power BI to support data-driven decision-making for
              medical professionals and pharmaceutical stakeholders
            </li>
            <li>
              Worked with a longitudinal database tracking over 5000 patients
              all over France
            </li>
            <li>
              Collaborated with multidisciplinary teams to translate medical and
              scientific needs into actionnable insights and visual analytics
            </li>
            <li>
              Ensured compliance with data privacy and healthcare regulations of
              sensitive patient information
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between mb-1">
            <h3 className="text-xl font-semibold text-purple-300">
              Sailing Instructor
            </h3>
            <span className="text-gray-400">
              2016 - 2025 (2 months every year)
            </span>
          </div>
          <div className="text-gray-500 mb-2">
            Multiple sailing clubs in Corsica and the south of France
          </div>
          <ul className="text-gray-100 list-disc pl-5 space-y-2">
            <li>Teaching catamaran and dinghy sailing courses at various levels</li>
            <li>Participating in the training of new instructors</li>
            <li>Multilingual skills: courses taught in French, English, and Spanish</li>
            <li>Ensuring safety and enjoyment with up to 12 boats</li>
            <li>Participating in the training of new instructors</li>
          </ul>
        </div>
      </div>
      {/* Volunteer work */}
    {/* Volunteer Work */}
    <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
            <FaHeart className="text-purple-500 mr-3" />
            <span className="border-b-2 border-purple-500 pb-1">
                Volunteer Work
            </span>
        </h2>

        <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between mb-1">
                <h3 className="text-xl font-semibold text-purple-300">
                    Camp Director
                </h3>
                <span className="text-gray-400">2022 - now</span>
            </div>
            <div className="text-gray-500 mb-2">
                Scouts et Guides de France
            </div>
            <ul className="text-gray-100 list-disc pl-5 space-y-2">
                <li>Managed multiple scout camps for children aged 8 to 14</li>
                <li>Supported and coordinated a team of 6 animators aged 17 to 21</li>
                <li>Supervised youth activities ensuring safety and positive experiences</li>
                <li>Developed and implemented annual educational projects tailored to children's needs, possibilities, and desires</li>
                <li>Created engaging outdoor programs focused on personal development and team building</li>
            </ul>
        </div>

        <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between mb-1">
                <h3 className="text-xl font-semibold text-purple-300">
                    Measurement Technician
                </h3>
                <span className="text-gray-400">July 2024 - August 2024</span>
            </div>
            <div className="text-gray-500 mb-2">
                Paris 2024 Olympic Games (@ Marseille)
            </div>
            <ul className="text-gray-100 list-disc pl-5 space-y-2">
                <li>Deployed and operated technical equipment to measure wind speed, direction, and wave conditions for Olympic sailing events</li>
                <li>Collaborated with international race officials to ensure accurate course measurements and buoy placements</li>
                <li>Monitored real-time meteorological data to provide critical information for race management decisions</li>
                <li>Maintained and calibrated sensitive measurement instruments in challenging marine environments</li>
                </ul>
        </div>
    </div>

      {/* Hobbies and Passions */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <TbStarsFilled className="text-purple-500 mr-3" />
          <span className="border-b-2 border-purple-500 pb-1">
            Hobbies & Passions
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors border-l-4 border-purple-500 flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-purple-300 mb-2">
              Sailing
            </h3>
            <p className="text-gray-400">
              I've been sailing before I even walked ! Its a passion that I love
              transmitting to other people, and there's no place I'd rather be
              than sailing through the sea, except maybe behind my keyboard ;).
            </p>
            <img
              src={xavoile}
              alt="Me giving a sailing course"
              className="mt-4 rounded-lg w-full h-48 object-cover"
            />
          </div>

          <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors border-l-4 border-purple-500 flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-purple-300 mb-2">
              Hackathons
            </h3>
            <p className="text-gray-400">
              I love participating in hackathons with friends where we solve
              challenges under pressure. These intense coding marathons improve
              my problem-solving skills and teach me new technologies.
            </p>
            <img
              src={nuitinfo}
              alt="Me receivin my black belt"
              className="mt-4 rounded-lg w-full h-48 object-cover"
            />
          </div>

          <div className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors border-l-4 border-purple-500 flex flex-col justify-between">
            <h3 className="text-xl font-semibold text-purple-300 mb-2">
              Volunteering
            </h3>
            <p className="text-gray-400">
              As much as I love being behind my keyboard, I also need to take a
              break in nature every now and again. Since high school I've devoted much of my
              weekends and holidays allowing less-fortunate kids a breath of
              fresh air.
            </p>
            <img
              src={xavchef}
              alt="Sailing"
              className="mt-4 rounded-lg w-full h-48 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
