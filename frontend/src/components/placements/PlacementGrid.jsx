import PlacementCard from "./PlacementCard";


function PlacementGrid({ placements }) {


  if(placements.length === 0)
  {
    return (
      <div className="bg-white rounded-xl border p-10 text-center text-gray-500">
        No placement records found.
      </div>
    );
  }


  return (

    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
      gap-6
      "
    >

      {
        placements.map((placement)=>(
          <PlacementCard
            key={placement._id}
            placement={placement}
          />
        ))
      }


    </div>

  );
}


export default PlacementGrid;