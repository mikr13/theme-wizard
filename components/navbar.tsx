"use client";

import {
  ArrowRight,
  Dice5,
  Lock,
  Paintbrush,
  Redo,
  Undo,
  Unlock,
} from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useColors from "@/theme/useColor";
import { BorderRadiusSelect } from "./border-radius-select";
import { ExportCode } from "./export-code";
import { FontsPopover } from "./fonts-popover";
import { ModeToggle } from "./mode-toggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

import { useEffect, useState } from "react";
import { ColorsToolbar } from "./colors-toolbar";

export const Navbar = () => {
  const { colors, undo, canUndo, redo, canRedo, setLockAllColors, randomize } =
    useColors();
  const [colorLock, setColorLock] = useState(false);

  // TODO : Multiple hotkeys ?
  useHotkeys(
    "ctrl+z",
    () => {
      if (canUndo) undo();
    },
    []
  );
  useHotkeys(
    "shift+ctrl+z",
    () => {
      if (canRedo) redo();
    },
    []
  );

  useHotkeys(
    "l",
    () => {
      setColorLock(!colorLock);
      setLockAllColors(!colorLock);
    },
    []
  );

  useHotkeys(
    "r",
    () => {
      randomize();
    },
    []
  );

  useEffect(() => {
    if (colorLock) {
      const allUnlocked = colors.every(({ locked }) => !locked);
      if (allUnlocked) setColorLock(false);
    } else {
      const allLocked = colors.every(({ locked }) => locked);
      if (allLocked) setColorLock(true);
    }
  }, [colors, colorLock]);

  const LockIcon = colorLock ? Lock : Unlock;

  return (
    <header className="fixed top-0 z-[100] w-full flex-none text-sm font-semibold leading-6 bg-background border-b">
      <nav className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center py-[1rem]">
          <a className="flex gap-3 items-center cursor-pointer">
            <Paintbrush className="w-8 h-8" />
            <h1 className="font-bold text-2xl">theme wizard</h1>
          </a>
          <Separator orientation="vertical" className="h-6 mx-6" />
          <div className="flex-1">
            <div className="flex items-center">
              <ColorsToolbar popoverAsModal />
              <Separator orientation="vertical" className="h-6 ml-6 mr-4" />

              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setColorLock(!colorLock);
                  setLockAllColors(!colorLock);
                }}
              >
                <LockIcon className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" onClick={randomize}>
                <Dice5 size={20} />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <FontsPopover />
            <BorderRadiusSelect />
            <Separator orientation="vertical" className="h-6 ml-6 mx-4" />
            <Button
              size="icon"
              variant="ghost"
              disabled={!canUndo}
              onClick={() => undo()}
            >
              <Undo size={20} />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              disabled={!canRedo}
              onClick={() => redo()}
            >
              <Redo size={20} />
            </Button>
            <ModeToggle />
            <Dialog>
              <DialogTrigger asChild>
                <Button className="inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 -my-2.5">
                  <div className="flex gap-2 items-center font-semibold ">
                    Export theme
                    <ArrowRight size={16} />
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Theme</DialogTitle>
                  <DialogDescription>
                    Copy and paste the following code into your globals.css
                    file.
                  </DialogDescription>
                </DialogHeader>
                <ExportCode />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </nav>
    </header>
  );
};
