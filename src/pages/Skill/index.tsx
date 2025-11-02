import { Tag } from "../../components/Tag";
import { skills } from "../../data/skill.data";
import { Content } from "../../layout";
import { Container, Logo } from "./components";

const data =
  "data:image/svg+xml,%3csvg%20width='51'%20height='44'%20viewBox='0%200%2051%2044'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_724_8519)'%3e%3cpath%20d='M40.984%200.385498H50.9991L25.9615%2043.5754L0.923828%200.385498H20.0776L25.9615%2010.4005L31.7201%200.385498H40.984Z'%20fill='%2341B883'/%3e%3cpath%20d='M0.923828%200.385498L25.9615%2043.5754L50.9991%200.385498H40.984L25.9615%2026.2994L10.8137%200.385498H0.923828Z'%20fill='%2341B883'/%3e%3cpath%20d='M10.8135%200.385498L25.9612%2026.4246L40.9838%200.385498H31.7199L25.9612%2010.4005L20.0774%200.385498H10.8135Z'%20fill='%2335495E'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_724_8519'%3e%3crect%20width='50.0781'%20height='43.229'%20fill='white'%20transform='translate(0.921875%200.385498)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";

const data2 = [
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
  {
    name: "vue",
    src: data,
    color: "#41B883",
  },
];

export default function Skill() {
  return (
    <>
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
        <div>
          <Container direction="right">
            {data2.map((data, index) => (
              <Logo key={index} src={data.src} name={data.name} />
            ))}
          </Container>
          <Container direction="left">
            {data2.map((data, index) => (
              <Logo key={index} src={data.src} name={data.name} />
            ))}
          </Container>
          <Container direction="right">
            {data2.map((data, index) => (
              <Logo key={index} src={data.src} name={data.name} />
            ))}
          </Container>
          <Container direction="left">
            {data2.map((data, index) => (
              <Logo key={index} src={data.src} name={data.name} />
            ))}
          </Container>
          <Container direction="right">
            {data2.map((data, index) => (
              <Logo key={index} src={data.src} name={data.name} />
            ))}
          </Container>
          <Container direction="left">
            {data2.map((data, index) => (
              <Logo key={index} src={data.src} name={data.name} />
            ))}
          </Container>
        </div>
      </Content>
    </>
  );
}
