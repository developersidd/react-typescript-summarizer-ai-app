import { logo } from "../assets";
const Hero = () => {
  return (
    <header className="flex justify-center items-center flex-col w-full">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="sumz_logo" className="w-28 object-contain" />
        <button type="button" onClick={() => window.open("https://github.com/developersidd/react-typescript-summarizer-ai-app")} className="black_btn flex gap-2 items-center font-medium "> Github
          <>
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
            </span>
          </>
        </button>

      </nav>
      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient"> OPenAI GPT-4 </span>
      </h1>
      <h2 className="desc"> Simplify Your Reading with Summarize, an open-source article summarizer that tranforms lengthy atticles into clear and concise summaries </h2>
    </header>
  )
}

export default Hero