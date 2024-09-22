import { BarChart } from "@mantine/charts";

const data = [
    { idade: "Até 21", Candidatos: 84, Laptops: 900, Tablets: 200 },
    { idade: "22 - 40", Candidatos: 3338, Laptops: 1200, Tablets: 400 },
    { idade: "41 - 60", Candidatos: 5742, Laptops: 1000, Tablets: 200 },
    { idade: "Acima de 60", Candidatos: 1028, Laptops: 200, Tablets: 800 },
];

export default function Demo() {
    return (
        <div className="w-full flex p-4">
            <BarChart
                h={300}
                data={data}
                dataKey="idade"
                series={[
                    { name: "Candidatos", color: "rgba(255, 118, 100, 1)" },
                ]}
                tickLine="y"
                orientation="vertical"
                tooltipAnimationDuration={200}
                classNames={{
                    bar: "rounded-xl overflow-hidden",
                }}
            />
        </div>
    );
}
