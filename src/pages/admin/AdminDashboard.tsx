import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="text-xs text-white/30 uppercase tracking-widest mb-1">Панель управления</div>
        <h1 className="font-russo text-2xl text-white">Добро пожаловать в Admin</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
        <Link
          to="/admin/reviews"
          className="glass-card p-6 flex flex-col gap-3 hover:border-[#FFD700]/30 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/20 flex items-center justify-center">
            <Icon name="MessageSquare" size={18} style={{ color: "#FFD700" }} />
          </div>
          <div>
            <h2 className="font-russo text-base text-white mb-1">Модерация отзывов</h2>
            <p className="text-white/40 text-xs leading-relaxed">
              Одобряй или отклоняй отзывы из формы на сайте. Одобренные появляются на странице /reviews.
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#FFD700] group-hover:gap-2 transition-all mt-auto">
            Перейти <Icon name="ArrowRight" size={11} />
          </div>
        </Link>

        <Link
          to="/admin/content"
          className="glass-card p-6 flex flex-col gap-3 hover:border-[#00E5FF]/30 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/20 flex items-center justify-center">
            <Icon name="FileText" size={18} style={{ color: "#00E5FF" }} />
          </div>
          <div>
            <h2 className="font-russo text-base text-white mb-1">Управление контентом</h2>
            <p className="text-white/40 text-xs leading-relaxed">
              Редактируй тексты, заголовки и описания основных разделов сайта.
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#00E5FF] group-hover:gap-2 transition-all mt-auto">
            Перейти <Icon name="ArrowRight" size={11} />
          </div>
        </Link>
      </div>
    </div>
  );
}
