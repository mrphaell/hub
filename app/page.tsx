import Matrix from "@/components/matrix";
import ProjectGrid from "@/components/project-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  const contato = [
    {
      label: "Instagram",
      value: "@seu_instagram",
    },
    {
      label: "Telefone",
      value: "(xx)xxxx-xxxx",
    },
    {
      label: "Curriculo",
      value: "#",
    },
    {
      label: "LinkedIn",
      value: "#",
    },
  ];

  return (
    <div className="relative z-0 min-h-screen font-mono text-green-600 dark">
      {/* Matrix background */}
      <Matrix />
      {/* Content */}

      <div className="text-center p-2">
        <Card className="max-w-xl mx-auto mt-20 mb-5 p-5 border border-green-500 bg-black/10 backdrop-blur-xs text-green-600">
          <CardHeader>
            <h1 className="font-semibold text-2xl">Hub de Projetos</h1>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="text-green-600 border-green-500 font-mono backdrop-blur-xs"
                >
                  Contato
                </Button>
              </DialogTrigger>
              <DialogContent className="border-green-500 bg-black/10 backdrop-blur-xs">
                <DialogTitle className="text-green-600 font-bold font-mono">
                  Contato
                </DialogTitle>
                {contato.map((item) => (
                  <div
                    key={item.label}
                    className="text-green-600 font-mono p-0"
                  >
                    <span className="font-semibold text-md mr-2">
                      {item.label}:
                    </span>
                    <span className="text-md">{item.value}</span>
                  </div>
                ))}
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-green-500 text-green-600 font-mono backdrop-blur-xs bg-black/10 hover:backdrop-blur-3xl hover:bg-black/10 hover:text-white"
                  >
                    Fechar
                  </Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
        <Card className="w-full max-w-5xl mx-auto mt-20 mb-5 p-5 border border-green-500 bg-black/10 backdrop-blur-xs">
          <CardContent className="p-5">
            <ProjectGrid />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
