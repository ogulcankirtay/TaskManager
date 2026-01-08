import { Plus } from "lucide-react";
import { useState } from "react";

interface TaskCreateBarProps {
  onCreate: (title: string, description: string) => Promise<void> | void;
}

export const TaskCreateBar = ({ onCreate }: TaskCreateBarProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) return;

    try {
      setLoading(true);
      await onCreate(title, description);
      setTitle("");
      setDescription("");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Başlık *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Görev başlığını girin..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Açıklama
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Görev detaylarını ekleyin..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading || !title.trim()}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all ${
              loading || !title.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            <Plus className="w-5 h-5" />
            {loading ? 'Kaydediliyor...' : 'Görev Ekle'}
          </button>
        </div>
      </div>

  
    </div>
  );
};