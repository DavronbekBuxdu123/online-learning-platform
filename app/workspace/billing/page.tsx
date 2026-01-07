import { PricingTable } from "@clerk/nextjs";

function Billing() {
  return (
    <div className="p-4 md:p-10">
      <h2 className="text-xl font-bold mb-5">Obuna ta'riflari</h2>
      <PricingTable />
    </div>
  );
}

export default Billing;
