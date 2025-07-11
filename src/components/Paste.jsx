import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utils/formatDate";
import "./Paste.css"; // ✅ Import the CSS file

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
  };

  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="paste-container">
      <div className="flex flex-col gap-y-3">
        <div className="search-box">
          <input
            type="search"
            placeholder="Search paste here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="paste-wrapper">
          <h2 className="paste-header">All Pastes</h2>
          <div className="paste-list">
            {filteredPastes.length > 0 ? (
              filteredPastes.map((paste) => (
                <div key={paste?._id} className="paste-item">
                  <div className="w-[50%] flex flex-col space-y-3">
                    <p className="paste-title">{paste?.title}</p>
                    <p className="paste-content">{paste?.content}</p>
                  </div>

                  <div className="paste-actions">
                    <div className="action-buttons">
                      <button>
                        <a href={`/?pasteId=${paste?._id}`}>
                          <PencilLine className="text-black hover:text-blue-500" size={20} />
                        </a>
                      </button>
                      <button onClick={() => handleDelete(paste?._id)}>
                        <Trash2 className="text-black hover:text-pink-500" size={20} />
                      </button>
                      <button>
                        <a href={`/pastes/${paste?._id}`} target="_blank">
                          <Eye className="text-black hover:text-orange-500" size={20} />
                        </a>
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to Clipboard");
                        }}
                      >
                        <Copy className="text-black hover:text-green-500" size={20} />
                      </button>
                    </div>

                    <div className="calendar-info">
                      <Calendar className="text-black" size={20} />
                      {FormatDate(paste?.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data">No Data Found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;
