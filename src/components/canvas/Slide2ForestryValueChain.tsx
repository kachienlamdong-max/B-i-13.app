/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Factory, Trees, Truck, Recycle, Award, CheckCircle, ChevronRight, Layers } from 'lucide-react';

interface ChainNode {
  id: number;
  title: string;
  subTitle: string;
  icon: React.ReactNode;
  description: string;
  sgkRole: string;
  keyOutputs: string[];
}

export const Slide2ForestryValueChain: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isAutoAnimating, setIsAutoAnimating] = useState<boolean>(true);

  const chainNodes: ChainNode[] = [
    {
      id: 1,
      title: 'Lâm sinh & Trồng rừng',
      subTitle: 'Nền tảng duy trì tài nguyên',
      icon: <Trees className="w-5 h-5 text-emerald-400" />,
      description: 'Trồng mới rừng sản xuất, khoanh nuôi tái sinh rừng tự nhiên, quản lý vườn ươm giống cây sinh trưởng nhanh chất lượng cao (keo lai, bạch đàn, mỡ, quế).',
      sgkRole: 'Vai trò nền tảng: Duy trì và mở rộng diện tích rừng, tạo vùng nguyên liệu gỗ hợp pháp có chứng chỉ quản lý rừng bền vững (FSC/PEFC).',
      keyOutputs: ['Rừng nguyên liệu tập trung', 'Cây giống cải tiến gen', 'Chứng chỉ rừng bền vững FSC'],
    },
    {
      id: 2,
      title: 'Khai thác & Vận chuyển',
      subTitle: 'Tuân thủ định ngạch bền vững',
      icon: <Truck className="w-5 h-5 text-amber-400" />,
      description: 'Khai thác gỗ theo chu kỳ luân kỳ, tuyệt đối không khai thác trắng rừng phòng hộ/đặc dụng; cơ giới hóa khâu kéo gỗ, vận chuyển chuyên dụng đến các cụm công nghiệp chế biến.',
      sgkRole: 'Khai thác gắn với quy hoạch trữ lượng, truy xuất nguồn gốc gỗ hợp pháp và bảo vệ mặt đất chống xói mòn.',
      keyOutputs: ['Gỗ tròn có mã vạch truy xuất', 'Cắt tầng ngọn tận thu', 'Bảo toàn tầng cây tái sinh'],
    },
    {
      id: 3,
      title: 'Chế biến công nghệ cao',
      subTitle: 'Gia tăng giá trị xuất khẩu',
      icon: <Factory className="w-5 h-5 text-sky-400" />,
      description: 'Hệ thống nhà máy cưa xẻ tự động, sấy hơi nước, sản xuất ván ép công nghiệp (MDF, HDF, ván dán) và các xưởng sản xuất đồ gỗ nội thất, ngoại thất phục vụ xuất khẩu toàn cầu.',
      sgkRole: 'Sản phẩm chủ yếu: Gỗ xẻ, ván gỗ công nghiệp, đồ gỗ nội thất cao cấp xuất khẩu sang Hoa Kỳ, EU, Nhật Bản; giấy và bột giấy.',
      keyOutputs: ['Gỗ xẻ sấy kỹ thuật', 'Ván dán & ván ép MDF', 'Đồ gỗ nội thất tinh xảo'],
    },
    {
      id: 4,
      title: 'Kinh tế tuần hoàn & Trồng bù',
      subTitle: 'Không rác thải (Zero-waste)',
      icon: <Recycle className="w-5 h-5 text-teal-400" />,
      description: 'Tận dụng 100% mùn cưa, dăm bào, cành ngọn làm viên nén sinh khối xuất khẩu sang Hàn Quốc/Nhật Bản; đồng thời trích quỹ tái đầu tư trồng bù rừng cho chu kỳ tiếp theo.',
      sgkRole: 'Phát triển bền vững: Nâng cao giá trị kinh tế trên mỗi mét khối gỗ, giảm phát thải khí nhà kính và chủ động nguồn nguyên liệu chu kỳ mới.',
      keyOutputs: ['Viên nén mùn cưa (Pellets)', 'Năng lượng sinh khối xanh', 'Quỹ tái sinh phủ xanh rừng'],
    },
  ];

  const current = chainNodes.find((n) => n.id === activeStep) || chainNodes[0];

  return (
    <div className="h-full flex flex-col justify-between overflow-y-auto p-4 md:p-6 bg-slate-900 text-white rounded-lg">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Factory className="w-3.5 h-3.5" />
            <span>Mô hình Chuỗi giá trị Lâm nghiệp khép kín</span>
          </div>
          <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
            Hoạt động phát triển ngành lâm nghiệp hiện đại
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Chuỗi tuần hoàn:</span>
          <span className="font-semibold text-emerald-400">Lâm sinh → Khai thác → Chế biến → Tái sinh</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-3">
        {/* Left: Interactive 4-Stage Pathway (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950/60 p-4 rounded-lg border border-slate-800">
          <div className="text-xs text-slate-400 mb-2 flex items-center justify-between">
            <span>Sơ đồ 4 giai đoạn chuỗi cung ứng gỗ & lâm sản</span>
            <span className="text-emerald-400 text-[11px]">Click từng khâu để khám phá</span>
          </div>

          {/* Stepper Pipeline */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
            {chainNodes.map((node) => {
              const isActive = activeStep === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setActiveStep(node.id)}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    isActive
                      ? 'bg-emerald-950/80 border-emerald-500 shadow-xs'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-slate-400">0{node.id}</span>
                    {node.icon}
                  </div>
                  <h4 className="text-xs font-bold text-white leading-tight mb-1">{node.title}</h4>
                  <p className="text-[10px] text-slate-400 line-clamp-1">{node.subTitle}</p>
                </button>
              );
            })}
          </div>

          {/* Animated Value Flow Canvas */}
          <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-slate-900 h-48 md:h-56">
            <img
              src="/src/assets/images/wood_industry_vietnam_1794228680624.jpg"
              alt="Nhà máy chế biến lâm sản công nghệ cao"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent p-4 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-600 text-white">
                  Giai đoạn 0{current.id}
                </span>
                <span className="text-xs font-bold text-emerald-300">{current.title}</span>
              </div>
              <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">{current.description}</p>
            </div>
          </div>
        </div>

        {/* Right: Detailed SGK Role & Examination Focus (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950/60 p-4 rounded-lg border border-slate-800">
          <div>
            <div className="pb-2 border-b border-slate-800 mb-3">
              <span className="text-[11px] text-emerald-400 uppercase tracking-wide font-semibold">
                Kiến thức trọng tâm SGK Địa lí 12
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">{current.title}</h3>
            </div>

            <div className="p-3 bg-slate-900/90 border border-slate-800 rounded mb-3 text-xs text-slate-300 leading-relaxed">
              <div className="font-semibold text-emerald-300 mb-1 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                <span>Ý nghĩa sư phạm:</span>
              </div>
              <p>{current.sgkRole}</p>
            </div>

            <div className="mb-3">
              <span className="text-[11px] text-slate-400 font-medium block mb-1.5">
                Sản phẩm & Thành tựu tiêu biểu:
              </span>
              <div className="space-y-1.5">
                {current.keyOutputs.map((out, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs text-slate-200 bg-slate-900 px-2.5 py-1.5 rounded border border-slate-800/80"
                  >
                    <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{out}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Quiz Guidance for S2 Questions */}
          <div className="p-3 bg-sky-950/40 border border-sky-800/60 rounded text-xs text-sky-200">
            <span className="font-bold text-sky-300 block mb-1">Điểm lưu ý khi làm bài tập:</span>
            <p className="text-[11px] text-sky-100 leading-relaxed">
              Khâu <strong>trồng rừng và khoanh nuôi</strong> là nền tảng sống còn. Các sản phẩm chủ lực của công nghiệp chế biến bao gồm <strong>gỗ xẻ, ván ép, đồ gỗ nội thất xuất khẩu</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
        <span>Việt Nam nằm trong top 5 quốc gia xuất khẩu đồ gỗ lớn nhất thế giới</span>
        <span>Mục tiêu giá trị xuất khẩu lâm sản: &gt; 18 tỷ USD/năm</span>
      </div>
    </div>
  );
};
