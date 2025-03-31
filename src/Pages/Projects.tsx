import Project from "../Components/Project"

export default function Projects() {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <h1 className="text-2xl">My projects</h1>
            <div className="flex flex-wrap items-center gap-3 justify-center mt-5">

                <Project
                    name="Didactypo"
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
                    technologies={["React", "FastAPI", "Firebase", "Python", "CSS"]}
                    keywords={["fullstack", "education", "typing", "gamification"]}

                />
                <Project
                    name="Breast Cancer Detector"
                    image=""
                    github=""
                    description="A machine learning project utilizing scikit-learn and the well-known breast
                cancer dataset. It demonstrates data preprocessing, model training, and evaluation
                techniques to predict breast cancer outcomes."
                    technologies={["Jupyter", "Python", "SkLearn", "CSS"]}
                    keywords={["AI", "ML", "K-Nearest Neighbours", "classification"]}
                />
                <Project
                    name="Fou2Food"
                    url=""
                    image=""
                    github=""
                    description=""
                    technologies={["PHP", "CSS", "MySQL"]}
                />
                <Project
                    name="Codeco"
                    url=""
                    image="https://codeco.gamberge.org/static/media/codeco.c09faf3c5aea08ede680.png"
                    github=""
                    description=""
                    technologies={["React", "Tailwind"]}
                />
                <Project
                    name="Secured Air Enforcer"
                    url=""
                    image="https://cdn-icons-png.flaticon.com/512/6557/6557822.png"
                    github=""
                    description=""
                    technologies={["Java", "GraphStream"]}
                />
                <Project
                    name="Shared Coffee Project"
                    url="https://sharedcoffee.gamberge.org"
                    image="https://sharedcoffee.gamberge.org/assets/logo-DyYcxL2O.png"
                    github="https://github.com/XavierLeClavier/SharedCoffeeProject"
                    description=""
                    technologies={["React", "Tailwind"]}
                />
            </div>
        </div>
    )
}