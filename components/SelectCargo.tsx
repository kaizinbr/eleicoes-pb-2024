/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import {
    Group,
    Chip,
} from "@mantine/core";

import classes from "@/styles/Main.module.css";

export default function SelectCargo({
    cargo,
    setCargo,
}: {
    cargo: string;
    setCargo: (cargo: string) => void;
}) {
    const [data, setData] = useState<string[]>([]);
    const [value, setValue] = useState("");
    return (
        <Chip.Group multiple={false} value={cargo} onChange={setCargo}>
            <Group className="mb-6" justify="center">
                <Chip
                    classNames={{
                        // root: classes.chip,
                        label: classes.chip,
                    }}
                    value="11"
                >
                    Prefeito
                </Chip>
                <Chip
                    classNames={{
                        // root: classes.chip,
                        label: classes.chip,
                    }}
                    value="12"
                >
                    Vice-prefeito
                </Chip>
                <Chip
                    classNames={{
                        // root: classes.chip,
                        label: classes.chip,
                    }}
                    value="13"
                >
                    Vereador
                </Chip>
            </Group>
        </Chip.Group>
    );
}
