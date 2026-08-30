import { Link } from "react-router-dom";
import { useContent } from "../i18n";
import { site } from "../data/site";

export default function Footer() {
    const { identity, footer } = useContent("common");
    return (
        <footer className="bg-gray-900 text-white py-8 relative z-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-bold">{identity.name}</h3>
                        <p className="text-gray-300 mt-1">{identity.brandline}</p>
                    </div>

                    <div className="flex space-x-4">
                        <a href={site.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
                            {footer.github}
                        </a>
                        <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
                            {footer.linkedin}
                        </a>
                        <a href={site.social.email} className="hover:text-gray-400 transition-colors">
                            {footer.email}
                        </a>
                    </div>
                </div>

                <div className="mt-6 text-center text-gray-400 text-sm">
                    <p>{footer.rights.replace("{year}", String(new Date().getFullYear()))}</p>
                    <div className="mt-2 flex flex-col sm:flex-row justify-center items-center gap-2">
                        <Link to="/version-log" className="hover:text-gray-200 underline">{footer.changelog}</Link>
                        <Link to="/" className="hover:text-gray-200 underline ml-4">{footer.home}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
