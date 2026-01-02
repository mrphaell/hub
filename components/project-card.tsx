"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ChevronDown, ChevronUp, ExternalLink, Link } from "lucide-react";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface ProjectCardProps {
  project: any;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = openId === project.id;
  const getDifficulty = (rank: string) => {
    switch (rank) {
      case "facil":
        return "Fácil";
      case "medio":
        return "Médio";
      case "dificil":
        return "Difícil";
      default:
        return "WIP";
    }
  };

  return (
    <div key={project.id} className="m-2">
      <Card>
        <Collapsible
          open={open}
          onOpenChange={(v) => setOpenId(v ? project.id : null)}
        >
          <CardHeader className="flex flex-row text-sm w-full justify-between">
            <CollapsibleTrigger asChild>
              <Button size="sm" variant="ghost" className="w-full">
                <span className="text-green-600 overflow-hidden">
                  {project.nome || "Work In Progress"}
                </span>
                {open ? (
                  <ChevronUp className="text-green-600" />
                ) : (
                  <ChevronDown className="text-green-600" />
                )}
              </Button>
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent>
              <p className="text-sm font-light">{project.descricao}</p>
              <p>
                <span className="mr-2 text-sm text-green-600 font-semibold">
                  Dificuldade:
                </span>
                <span className="text-sm">{getDifficulty(project.tipo)}</span>
              </p>
              <p>
                <span className="mr-2 text-sm text-green-600 font-semibold">
                  Data de início:
                </span>
                <span className="text-sm">
                  {new Date(project.data_inicio).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </p>
              <p>
                <span className="mr-2 text-sm text-green-600 font-semibold">
                  Data de conclusão:
                </span>
                <span className="text-sm">
                  {new Date(project.data_conclusao).toLocaleDateString(
                    "pt-BR",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  )}
                </span>
              </p>
              {project.link && (
                <p className="text-center">
                  <a
                    className=" inline-flex text-sm text-green-600 text-center gap-2"
                    href="#"
                  >
                    Abrir link do projeto
                    <ExternalLink size={16} />
                  </a>
                </p>
              )}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
}
