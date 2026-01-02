/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import LoginDialog from "./login";
import ProjectCard from "./project-card";

export default async function ProjectGrid() {
  const snap = await getDocs(collection(db, "projetos"));
  const projetos = snap.docs
    .map((d) => ({ id: d.id, ...(d.data() as any) }))
    .map((p) => {
      const inicio = p.data_inicio ? p.data_inicio.toMillis() : null;
      const conclusao = p.data_conclusao ? p.data_conclusao.toMillis() : null;

      return {
        id: p.id,
        data_inicio: inicio,
        data_conclusao: conclusao,
        descricao: p.descricao,
        link: p.link,
        nome: p.nome,
        tipo: p.tipo,
      };
    });
  const anoOptions = Array.from(
    new Set(
      projetos.map((projeto) => {
        const date = new Date(projeto.data_conclusao);
        return date.getFullYear();
      })
    )
  );
  const labelByNivel: Record<string, string> = {
    facil: "Fácil",
    medio: "Médio",
    dificil: "Difícil",
    WIP: "WIP",
  };

  const dificuldadeOptions = Array.from(
    new Map(
      projetos.map((p) => {
        const nivel = (p.tipo || "WIP").toLowerCase();
        const label = labelByNivel[nivel] ?? "WIP";
        return [nivel, { key: nivel, nivel, label }] as const; // key = stable
      })
    ).values()
  );

  // TODO - Implement filter (must be in a new client component)

  return (
    <div>
      <div className="flex flex-row gap-2 overflow-x-scroll [&::-webkit-scrollbar]:hidden pb-5 justify-center">
        <Select>
          <SelectTrigger className="border-green-500">
            <SelectValue placeholder="Filtrar por ano" />
          </SelectTrigger>
          <SelectContent className="border-green-500 backdrop-blur font-mono text-green-600 bg-black/10">
            <SelectGroup>
              <SelectLabel>Ano</SelectLabel>
              {anoOptions.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="border-green-500">
            <SelectValue placeholder="Filtrar por dificuldade" />
          </SelectTrigger>
          <SelectContent className="border-green-500 backdrop-blur font-mono text-green-600 bg-black/10">
            <SelectGroup>
              <SelectLabel>Dificuldade</SelectLabel>
              {dificuldadeOptions.map((dificuldade) => (
                <SelectItem key={dificuldade.key} value={dificuldade.nivel}>
                  {dificuldade.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <LoginDialog />
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projetos.length > 0 &&
          projetos.map((projeto) => (
            <ProjectCard key={projeto.id} project={projeto} />
          ))}
      </div>
    </div>
  );
}
