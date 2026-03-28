import React, { useRef, useState } from "react";
import Quill from "quill";
import Editor from "./Editor";
import Swal from "sweetalert2";
import { useUpdateAdminMiscellaneousMutation } from "../../redux/features/sijanSlice/sijan.slice";


const EditSection = ({ data, section, id }) => {
  const [range, setRange] = useState();
  const [lastChange, setLastChange] = useState();
  const [readOnly, setReadOnly] = useState(false);
  const [updateAdminMiscellaneous, { isLoading: isUpdating }] = useUpdateAdminMiscellaneousMutation();


  const quillRef = useRef(null);

  // Extract the actual content from the API response
  const getContentFromData = () => {
    if (!data) return "";
    return data;
  };

  const handleUpdate = async () => {
    if (!id) {
        Swal.fire({
            icon: "error",
            title: "Missing ID",
            text: "Cannot update without a valid section ID.",
        });
        return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#343F4F",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Get the updated content from Quill editor
          const content = quillRef.current?.root.innerHTML || "";
          
          await updateAdminMiscellaneous({
            id: id,
            data: { value: content }
          }).unwrap();

          // Show success message
          Swal.fire({
            position: "top center",
            icon: "success",
            title: "Content updated successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          
        } catch (error) {
          // Handle error
          console.error("Update failed:", error);
          Swal.fire({
            position: "top center",
            icon: "error",
            title: "Update failed!",
            text: error?.data?.message || "There was an error updating the content. Please try again.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  

  return (
    <div
      className="flex bg-white flex-col gap-4 p-3 relative"
      style={{
        minHeight: "500px",
        boxShadow: "0px 0px 10px 0px #0000001A",
      }}
    >
      <Editor
        ref={quillRef}
        readOnly={readOnly }
        defaultValue={getContentFromData()} // Use the extracted content
        onSelectionChange={setRange}
        onTextChange={setLastChange}
      />

      {/* Update button */}
      <div className="flex justify-end right-5 absolute top-5">
        <button
          style={{ background: "#343F4F" }}
          onClick={handleUpdate}
          disabled={isUpdating}
          className="px-5 py-1 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
        >
          {isUpdating && <div className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full font-bold"></div>}
          Update
        </button>
      </div>
    </div>
  );
};

export default EditSection;