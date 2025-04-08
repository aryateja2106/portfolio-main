  
  import Gravity, { MatterBody } from "@/fancy/components/physics/gravity"
  import Image from "next/image"
    
    export default function TechGravity({ activeCategory }: { activeCategory: string }) {
      console.log(activeCategory)
      const slugs = [
          "typescript",
          "javascript",
          "dart",
          "react",
          "flutter",
          "android",
          "html5",
          "css3",
          "nodedotjs",
          "express",
          "nextdotjs",
          "prisma",
          "postgresql",
          "firebase",
          "nginx",
          "vercel",
          "testinglibrary",
          "jest",
          "cypress",
          "docker",
          "git",
          "jira",
          "github",
          "gitlab",
          "androidstudio",
          "sonarqube",
          "figma",
        ];
  
      return (
        <div className="w-full h-full flex flex-col items-center relative ">
          <Gravity gravity={{ x: 0, y: 1 }} className="w-full h-full">
            {slugs.map((slug) => {
              const randomX = Math.random() * 60 + 20 // Random x between 20-80%
              const randomY = Math.random() * 20 + 5 // Random y between 5-25%
              const bodyType = Math.random() > 0.7 ? "rectangle" : "circle"
    
              return (
                <MatterBody
                  key={slug}
                  matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                  bodyType={bodyType}
                  x={`${randomX}%`}
                  y={`${randomY}%`}
                >
                  <div
                    className={`p-4 ${
                      bodyType === "circle" ? "rounded-full" : "rounded-md"
                    } bg-white border border-border shadow-md text-foreground dark:text-muted`}
                  >
                    <Image loader={({ src }) => src} src={`https://cdn.simpleicons.org/${slug}/${slug}`} alt={slug} width={24} height={24} />
                  </div>
                </MatterBody>
              )
            })}
          </Gravity>
        </div>
      )
    }
    