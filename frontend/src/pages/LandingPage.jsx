import { FaFacebook, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="bg-white text-black h-[90vh] flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 relative bg-cover bg-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Organize your notes <br /> in one simple place
        </h1>
        <p className="text-gray-600 mb-6 max-w-xl">
          Save your ideas, tasks, and projects all in one app. Stay focused and
          boost productivity.
        </p>
        <Link
          to="login"
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Get Started
        </Link>

        <div className="flex justify-center space-x-6 mt-8">
          <a href="#">
            <FaFacebook size={22} />
          </a>
          <a href="#">
            <FaTwitter size={22} />
          </a>
          <a href="#">
            <FaGithub size={22} />
          </a>
          <a href="#">
            <FaLinkedin size={22} />
          </a>
        </div>
      </section>
    </div>
  );
}
