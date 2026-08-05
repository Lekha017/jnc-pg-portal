function MaintenancePolicy() {
  return (
    <div className="min-h-screen bg-white py-10">

      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-3xl font-bold text-[#2D2A70] mb-6">
          Maintenance Policy
        </h1>

        <div className="w-full h-[800px] border rounded-lg overflow-hidden">

          <iframe
            src="/documents/maintenance_policy.pdf"
            title="JNC Maintenance Policy"
            className="w-full h-full"
          />

        </div>

      </div>

    </div>
  );
}

export default MaintenancePolicy;