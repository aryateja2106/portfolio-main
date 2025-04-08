  import Gravity, { MatterBody } from "@/fancy/components/physics/gravity"
import Image from "next/image"

interface TechItem {
  name: string;
  color: string | null;
  background: string | null;
}

export default function TechGravity({ slugs }: { slugs: TechItem[] }) {
  
  return (
    <div className="w-full h-full flex flex-col items-center relative ">
      <Gravity gravity={{ x: 0, y: 1 }} className="w-full h-full">
        {slugs.map((slug, index) => {
          const randomX = Math.random() * 60 + 20 // Random x between 20-80%
          const randomY = Math.random() * 20 + 5 // Random y between 5-25%
          const bodyType = Math.random() > 0.7 ? "rectangle" : "circle"

          return (
            <MatterBody
              key={`${slug.name}-${slug.color}-${index}`}
              matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
              bodyType={bodyType}
              x={`${randomX}%`}
              y={`${randomY}%`}
            >
              <div
                className={`p-4 ${
                  bodyType === "circle" ? "rounded-full" : "rounded-md"
                } ${slug.background ? slug.background : "bg-white"} border border-border shadow-md text-foreground dark:text-muted`}
              >
                <Image loader={({ src }) => src} src={`https://cdn.simpleicons.org/${slug.name}/${slug.color ? slug.color : slug.name}`} alt={slug.name} width={24} height={24} />
              </div>
            </MatterBody>
          )
        })}
      </Gravity>
    </div>
  )
}