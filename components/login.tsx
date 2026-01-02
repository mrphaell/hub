"use client";

import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function LoginDialog() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleOnSubmit = () => {
    // TODO - Implement login
  };

  return (
    <Dialog>
      <form onSubmit={handleOnSubmit}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="border-green-500 bg-black/10 backdrop-blur">
          <DialogTitle className="text-green-600 font-bold font-mono">
            {isLogin ? "Login" : "Criar novo usuário"}
          </DialogTitle>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label
                htmlFor="username-1"
                className="text-green-600 font-semibold font-mono"
              >
                Usuário
              </Label>
              <Input
                id="username-1"
                name="username"
                placeholder="joao"
                className="border-green-500 font-mono text-green-600"
              />
            </div>
            <div className="grid gap-3">
              <Label
                htmlFor="password-1"
                className="text-green-600 font-semibold font-mono"
              >
                Senha
              </Label>
              <Input
                id="password-1"
                type="password"
                name="password"
                placeholder="senha1234"
                className="border-green-500 font-mono text-green-600"
              />
            </div>
            {!isLogin && (
              <div className="grid gap-3">
                <Label
                  htmlFor="secret-1"
                  className="text-green-600 font-semibold font-mono"
                >
                  Código de criação
                </Label>
                <Input
                  id="secret-1"
                  type="password"
                  name="secret"
                  placeholder="1234"
                  className="border-green-500 font-mono text-green-600"
                />
              </div>
            )}
          </div>
          <DialogClose asChild>
            <Button
              type="submit"
              variant="outline"
              className="border-green-500 text-green-600 font-mono bg-black/10 backdrop-blur hover:bg-black/10 hover:text-white"
            >
              {isLogin ? "Logar" : "Criar Usuário"}
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="outline"
            className="border-green-500 text-green-600 font-mono bg-black/10 backdrop-blur hover:bg-black/10 hover:text-white"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Criar usuário" : "Cancelar"}
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
}
