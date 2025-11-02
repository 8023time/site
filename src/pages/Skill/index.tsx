import { Tag } from "../../components/Tag";
import { skills } from "../../data/skill.data";
import { Content } from "../../layout";

export default function Skill() {
  return (
    <Content>
      <h2 className="text-center text-3xl font-bold mb-5 pt-2">
        My <span className="text-blue-500">Skills</span>
      </h2>

      <div className="flex flex-wrap gap-3 p-6 justify-center">
        {skills.map(skill => (
          <Tag key={skill} size="md" color="blue">
            {"#" + skill}
          </Tag>
        ))}
      </div>
    </Content>
  );
}
