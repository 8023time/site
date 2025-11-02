import { Tag } from "../../components/Tag";
import { skills } from "../../data/skill.data";

export default function Skill() {
  return (
    <section className="w-full flex flex-col items-center px-50">
      <div className="h-30"></div>
      <h2 className="text-3xl font-bold mb-6 relative">
        My <span className="text-blue-500">Skills</span>
        <span className="absolute left-1/2 -translate-x-1/2 w-16 h-[3px] bg-blue-500 rounded-full"></span>
      </h2>

      <div className="flex flex-wrap gap-3 p-6 justify-center">
        {skills.map((skill) => (
          <Tag key={skill} size="md" color="blue">
            {"#" + skill}
          </Tag>
        ))}
      </div>
    </section>
  );
}
