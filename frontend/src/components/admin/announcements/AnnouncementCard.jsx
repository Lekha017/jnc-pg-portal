import {
  Pencil,
  Trash2,
  CalendarDays,
  Building2,
  CheckCircle,
  XCircle,
} from "lucide-react";

const AnnouncementCard = ({
  announcement,
  onEdit,
  onDelete,
}) => {

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  };


  return (
    <div className="
      bg-white 
      border 
      border-gray-200 
      rounded-2xl 
      p-5 
      shadow-sm 
      hover:shadow-md 
      transition
    ">

      <div className="flex justify-between items-start">


        <div className="flex-1">


          {/* Category + Important */}

          <div className="flex items-center gap-2 mb-3">

            <span className="
              bg-[#EEF2FF]
              text-[#2D2A70]
              px-3
              py-1
              rounded-full
              text-xs
              font-medium
            ">
              {announcement.category}
            </span>


            {announcement.important && (
              <span className="
                bg-red-100
                text-red-700
                px-3
                py-1
                rounded-full
                text-xs
                font-semibold
              ">
                IMPORTANT
              </span>
            )}

          </div>



          {/* Title */}

          <h3 className="
            text-lg
            font-bold
            text-[#2D2A70]
          ">
            {announcement.title}
          </h3>



          {/* Description */}

          <p className="
            text-gray-600
            mt-3
            line-clamp-2
          ">
            {announcement.description}
          </p>



          {/* Details */}

          <div className="
            mt-4
            space-y-2
            text-sm
            text-gray-600
          ">


            <div className="flex items-center gap-2">
              <CalendarDays size={16}/>

              <span>
                Publish Date:
                {" "}
                {formatDate(
                  announcement.publishDate
                )}
              </span>
            </div>



            <div className="flex items-center gap-2">
              <CalendarDays size={16}/>

              <span>
                Expiry Date:
                {" "}
                {formatDate(
                  announcement.expiryDate
                )}
              </span>
            </div>



            {announcement.department && (
              <div className="flex items-center gap-2">
                <Building2 size={16}/>

                <span>
                  Department:
                  {" "}
                  {announcement.department.name}
                </span>

              </div>
            )}



            <div className="flex items-center gap-2">

              {announcement.isPublished ? (
                <>
                  <CheckCircle
                    size={16}
                    className="text-green-600"
                  />

                  <span className="text-green-600">
                    Published
                  </span>
                </>
              ) : (
                <>
                  <XCircle
                    size={16}
                    className="text-red-600"
                  />

                  <span className="text-red-600">
                    Draft
                  </span>
                </>
              )}

            </div>


          </div>


        </div>



        {/* Actions */}

        <div className="
          flex
          gap-3
          ml-4
        ">


          <button
            onClick={() =>
              onEdit(announcement)
            }
            className="
              text-blue-600
              hover:text-blue-800
            "
          >
            <Pencil size={20}/>
          </button>



          <button
            onClick={() =>
              onDelete(
                announcement._id
              )
            }
            className="
              text-red-600
              hover:text-red-800
            "
          >
            <Trash2 size={20}/>
          </button>


        </div>


      </div>


    </div>
  );
};


export default AnnouncementCard;