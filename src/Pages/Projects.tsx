import Project from "../Components/Project"

export default function Projects() {
    return (
        <div className="flex flex-col items-center w-screen h-screen">
            <h1 className="text-2xl">My projects</h1>
            <p>Hover over the tech icons to get their name</p>
            <div className="flex flex-wrap items-center gap-96 justify-center mt-5 mx-3">

                <Project
                    name="Didactypo"
                    subtitle="Team project"
                    url="https://didactypo.gamberge.org"
                    image="https://didactypo.gamberge.org/assets/logoDidactypo-DcuBfIfQ.png"
                    github="https://github.com/Team-Maitrobe/DidactypoFront"
                    description="Didactypo is a free, open-source website designed to help primary school
                students (ages 6-11) learn touch typing in a fun and educational way. It offers structured
                lessons followed by interactive exercises to improve typing speed and accuracy. Teachers
                can create classes, track student progress, and assign courses directly through the
                platform. The site also features weekly typing challenges with leaderboards and badges
                to encourage competition. In an increasingly digital world, Didactypo
                aims to make typing an essential skill for young learners."
                    technologies={["React", "TypeScript", "FastAPI", "Firebase", "Python", "CSS"]}
                    keywords={["fullstack", "education", "typing", "gamification"]}

                />
                <Project
                    name="Breast Cancer Detector"
                    subtitle="Personal project"
                    image="https://deepnote.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fjupyter.3224ecc9.png&w=3840&q=75"
                    github=""
                    description="A machine learning project utilizing scikit-learn and the well-known breast
                cancer dataset. It demonstrates data preprocessing, model training, and evaluation
                techniques to predict breast cancer outcomes."
                    technologies={["Jupyter", "Python", "SkLearn", "CSS"]}
                    keywords={["AI", "ML", "K-Nearest Neighbours", "classification"]}
                />
                <Project
                    name="Fou2Food"
                    subtitle="School project"
                    url="https://fou2food.gamberge.org"
                    image=""
                    github="https://github.com/Team-Maitrobe/blogPHP"
                    description="Fou2Food is a blog dedicated to food lovers. It allows users to share their
                    opinions and experiences with various restaurants. Users can create an account, write
                    reviews, and interact with other food enthusiasts. The platform aims to foster a
                    community of foodies who can exchange tips and recommendations."
                    technologies={["PHP", "CSS", "MySQL"]}
                    keywords={["fullstack", "food", "blog", "community", "CRUD"]}
                />
                <Project
                    name="Codeco"
                    subtitle="Personal project"
                    url="https://codeco.gamberge.org"
                    image="https://codeco.gamberge.org/static/media/codeco.c09faf3c5aea08ede680.png"
                    github="https://github.com/XavierLeClavier/Codeco"
                    description="If you're an entertainer looking to add a touch of adventure to your games,
                    struggling to decode a secret message, or simply fascinated by codes, you've come to the
                    right place! We are excited to share our passion for secret codes and puzzles with you.
                    Whether it's for thrilling treasure hunts, intriguing scavenger hunts, or dynamic group
                    activities, Codeco is here to bring a spark of creativity to your events."
                    technologies={["React", "Tailwind", "JavaScript"]}
                    keywords={["frontend", "decoding", "puzzles"]}
                />
                <Project
                    name="My Portfolio"
                    subtitle="Personal project"
                    url="https://xavierleclavier.gamberge.org"
                    image=""
                    github="https://github.com/XavierLeClavier/Portfolio"
                    description="This portfolio showcases my projects and skills. It is built using React and
                    Tailwind CSS, demonstrating my proficiency in frontend development. The design is
                    responsive and user-friendly, allowing visitors to easily navigate through my work."
                    technologies={["React", "TypeScript", "Tailwind"]}
                    keywords={["frontend", "portfolio", "design"]}
                />
                <Project
                    name="Secured Air Enforcer"
                    subtitle="School project"
                    image="https://cdn-icons-png.flaticon.com/512/6557/6557822.png"
                    github="https://github.com/NoFlyListInc/SecuredAirEnforcer"
                    description="Secured Air Enforcer is a Java-based project that simulates air traffic management
                    with a focus on safety and efficiency. I worked on the algorithms for coloring the graph
                    and finding the shortest routes, which were critical for optimizing airspace usage and
                    ensuring safe flight paths. Our algorithms were part of a school-wide competition, where
                    we ranked among the best for their efficiency and innovation."
                    technologies={["Java", "GraphStream", "OpenStreetMap"]}
                    keywords={["graph", "algorithmic", "application"]}
                />
                <Project
                    name="Shared Coffee Project"
                    subtitle="School project"
                    url="https://sharedcoffee.gamberge.org"
                    image="https://sharedcoffee.gamberge.org/assets/logo-DyYcxL2O.png"
                    github="https://github.com/XavierLeClavier/SharedCoffeeProject"
                    description="The Shared Coffee Project is a student-run campaign aiming to help people in need by sharing
                    a coffee and a warm place to stay. We base our model on the 'suspended coffee' concept, where you can buy a
                    coffee for someone else who can't afford it. We also provide a map of coffee shops that participate in
                    the project."
                    technologies={["React", "Tailwind"]}
                    keywords={["UX/UI", "design", "community"]}
                />
            </div>
        </div>
    )
}