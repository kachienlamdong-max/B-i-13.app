/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Lesson Data for Geography 12 (Kết nối tri thức)
 * Bài 13: Vấn đề phát triển ngành lâm nghiệp và thủy sản
 */

export interface RegionalForestData {
  id: string;
  name: string;
  areaKHa: number; // Nghìn ha
  coverageRate: number; // %
  naturalForest: number; // nghìn ha
  plantedForest: number; // nghìn ha
  keyCharacteristic: string;
  isMaxArea?: boolean;
  isMaxCoverage?: boolean;
  isMinCoverage?: boolean;
}

export interface FisheryTrendItem {
  year: number;
  capture: number; // Khai thác (nghìn tấn)
  aquaculture: number; // Nuôi trồng (nghìn tấn)
  total: number; // Tổng sản lượng
  captureShare: number; // %
  aquacultureShare: number; // %
}

export interface Question {
  id: string;
  slideId: number;
  type: 'true_false' | 'mcq' | 'calculation';
  prompt: string;
  options?: { id: string; text: string }[];
  correctAnswer: string | boolean;
  explanation: string;
  pedagogicalNote: string;
  hint?: string;
  calculationContext?: {
    formula: string;
    stepByStep: string;
    baseYearVal: number;
    targetYearVal: number;
  };
}

export interface LessonSection {
  id: number;
  slug: string;
  title: string;
  shortTitle: string;
  category: 'intro' | 'forestry' | 'fishery' | 'summary';
  allocatedMinutes: number;
  instruction: string;
  narrationText: string;
  questions: Question[];
}

export const FOREST_TABLE_13_1: RegionalForestData[] = [
  {
    id: 'tdmn-bb',
    name: 'Trung du và miền núi Bắc Bộ',
    areaKHa: 5405.1,
    coverageRate: 54.7,
    naturalForest: 3780.2,
    plantedForest: 1624.9,
    keyCharacteristic: 'Diện tích rừng lớn nhất cả nước, giàu tiềm năng gỗ và lâm sản ngoài gỗ.',
    isMaxArea: true,
  },
  {
    id: 'btb',
    name: 'Bắc Trung Bộ',
    areaKHa: 3125.6,
    coverageRate: 57.6,
    naturalForest: 2210.4,
    plantedForest: 915.2,
    keyCharacteristic: 'Tỉ lệ che phủ rừng cao nhất cả nước (57,6%), vai trò phòng hộ lũ đầu nguồn quan trọng.',
    isMaxCoverage: true,
  },
  {
    id: 'tay-nguyen',
    name: 'Tây Nguyên',
    areaKHa: 2570.4,
    coverageRate: 46.3,
    naturalForest: 2180.0,
    plantedForest: 390.4,
    keyCharacteristic: 'Độ che phủ cao, nhiều khu bảo tồn sinh quyển và rừng tự nhiên giá trị.',
  },
  {
    id: 'dh-ntb',
    name: 'Duyên hải Nam Trung Bộ',
    areaKHa: 1845.2,
    coverageRate: 41.2,
    naturalForest: 1210.5,
    plantedForest: 634.7,
    keyCharacteristic: 'Rừng phòng hộ ven biển chống cát bay cát chảy, hạn hán mùa khô.',
  },
  {
    id: 'dong-nam-bo',
    name: 'Đông Nam Bộ',
    areaKHa: 482.8,
    coverageRate: 20.4,
    naturalForest: 240.1,
    plantedForest: 242.7,
    keyCharacteristic: 'Rừng nguyên sinh Chiến khu D, Vườn quốc gia Cát Tiên, rừng ngập mặn Cần Giờ.',
  },
  {
    id: 'dbs-hong',
    name: 'Đồng bằng sông Hồng',
    areaKHa: 186.2,
    coverageRate: 8.8,
    naturalForest: 42.0,
    plantedForest: 144.2,
    keyCharacteristic: 'Chủ yếu rừng phi lao chắn sóng ven biển, vườn quốc gia Ba Vì, Cúc Phương.',
  },
  {
    id: 'dbs-cuu-long',
    name: 'Đồng bằng sông Cửu Long',
    areaKHa: 245.0,
    coverageRate: 6.0,
    naturalForest: 85.0,
    plantedForest: 160.0,
    keyCharacteristic: 'Tỉ lệ che phủ thấp nhất (6,0%) do đất ngập nước ưu tiên nông nghiệp & nuôi trồng thủy sản; có rừng tràm và đước.',
    isMinCoverage: true,
  },
];

export const TOTAL_FOREST_SUMMARY = {
  totalArea: 14860.3, // nghìn ha
  nationalCoverage: 42.02, // %
  target2030Coverage: 42.5,
  naturalForestTotal: 10130.0,
  plantedForestTotal: 4730.3,
};

export const FISHERY_TREND_DATA: FisheryTrendItem[] = [
  { year: 2010, capture: 2414.4, aquaculture: 2790.1, total: 5204.5, captureShare: 46.4, aquacultureShare: 53.6 },
  { year: 2015, capture: 3036.4, aquaculture: 3524.0, total: 6560.4, captureShare: 46.3, aquacultureShare: 53.7 },
  { year: 2018, capture: 3590.5, aquaculture: 4250.2, total: 7840.7, captureShare: 45.8, aquacultureShare: 54.2 },
  { year: 2021, capture: 3920.8, aquaculture: 4872.0, total: 8792.8, captureShare: 44.6, aquacultureShare: 55.4 },
  { year: 2024, capture: 3968.8, aquaculture: 5687.5, total: 9656.3, captureShare: 41.1, aquacultureShare: 58.9 },
];

export const MAJOR_FISHING_GROUNDS = [
  {
    id: 'hp-qn',
    name: 'Ngư trường Hải Phòng - Quảng Ninh',
    seaArea: 'Vịnh Bắc Bộ',
    species: 'Cá nục, cá thu, cá chim, mực nang, ghẹ, tôm he',
    coastalAdvantage: 'Vịnh kín gió, nhiều đảo ven bờ, cảng cá Cát Bà, Bạch Long Vĩ',
    strategicRole: 'Cung cấp thủy sản cho vùng duyên hải Bắc Bộ và xuất khẩu tiểu ngạch.',
    coordinates: { x: 58, y: 16 },
  },
  {
    id: 'hs-ts',
    name: 'Ngư trường Quần đảo Hoàng Sa, Trường Sa',
    seaArea: 'Vùng biển khơi xa Biển Đông',
    species: 'Cá ngừ đại dương, cá thu khơi, hải sâm, ốc hương, tôm hùm đá',
    coastalAdvantage: 'Vùng nước sâu, rạn san hô trù phú, nguồn hải sản giá trị kinh tế cao',
    strategicRole: 'Khai thác xa bờ gắn với bảo vệ chủ quyền biển đảo thiêng liêng của Tổ quốc.',
    coordinates: { x: 80, y: 48 },
  },
  {
    id: 'nt-bt-brvt',
    name: 'Ngư trường Ninh Thuận - Bình Thuận - Bà Rịa - Vũng Tàu',
    seaArea: 'Nam Trung Bộ và Đông Nam Bộ',
    species: 'Cá nục, cá trích, cá cơm (làm nước mắm), mực ống, tôm biển',
    coastalAdvantage: 'Hiện tượng nước trồi dinh dưỡng trù phú, ít bão, số ngày ra khơi quanh năm cao',
    strategicRole: 'Trung tâm khai thác hải sản công nghiệp lớn hàng đầu cả nước.',
    coordinates: { x: 62, y: 74 },
  },
  {
    id: 'cm-kg',
    name: 'Ngư trường Cà Mau - Kiên Giang',
    seaArea: 'Vịnh Thái Lan & Vùng biển Tây Nam',
    species: 'Tôm sắt, tôm càng xanh, cá khoai, mực mai, ghẹ lột',
    coastalAdvantage: 'Thềm lục địa rộng nông, bãi tôm bãi cá liên hoàn, sinh thái rừng ngập mặn đước mắm',
    strategicRole: 'Trọng điểm khai thác hải sản biển Tây Nam với sản lượng tôm cá vượt trội.',
    coordinates: { x: 34, y: 92 },
  },
];

export const REGIONAL_COMPARISON_4_ZONES = [
  {
    id: 'tdmn-bb',
    regionName: 'Trung du & Miền núi Bắc Bộ',
    badge: 'Lâm nghiệp Trọng điểm Phía Bắc',
    forestAdvantage: 'Diện tích rừng lớn nhất cả nước (5,4 triệu ha), phát triển vùng nguyên liệu gỗ giấy, ván ép, lâm sản quý (hồi, quế, thảo quả).',
    fisheryAdvantage: 'Khai thác vịnh Bắc Bộ (Quảng Ninh) & nuôi cá lồng hồ thủy điện (Hòa Bình, Thác Bà, Sơn La) với cá tầm, cá hồi.',
    sustainablePolicy: 'Khoanh nuôi bảo vệ rừng đầu nguồn sông Đà, sông Lô kết hợp chuỗi chế biến gỗ xuất khẩu bền vững.',
  },
  {
    id: 'tay-nguyen',
    regionName: 'Tây Nguyên',
    badge: 'Lâm sinh Nóc nhà Đông Dương',
    forestAdvantage: 'Độ che phủ 46,3%, rừng tự nhiên trữ lượng lớn, gỗ quý (cẩm lai, trắc, giáng hương); giữ nguồn nước cho toàn lưu vực Mekong, Sê San, Srêpôk.',
    fisheryAdvantage: 'Chủ yếu nuôi thủy sản nước ngọt trên hồ chứa thủy lợi, thủy điện và đầm hồ tự nhiên.',
    sustainablePolicy: 'Tuyệt đối đóng cửa rừng tự nhiên, phục hồi rừng phòng hộ lưu vực sông, phát triển lâm nghiệp xã hội đa giá trị.',
  },
  {
    id: 'btb-dhntb',
    regionName: 'Bắc Trung Bộ & Duyên hải NTB',
    badge: 'Căn cứ Hải sản & Rừng che chắn',
    forestAdvantage: 'Bắc Trung Bộ có tỉ lệ che phủ cao nhất cả nước (57,6%). DHNTB có dải rừng phòng hộ ven biển ngăn nạn cát bay, cát chảy.',
    fisheryAdvantage: 'Sở hữu 2/4 ngư trường lớn, cơ sở nuôi trồng tôm trên cát công nghệ cao, sản lượng tôm hùm, cá ngừ đại dương đứng đầu nước.',
    sustainablePolicy: 'Hiện đại hóa đội tàu đánh bắt xa bờ chống khai thác IUU; bảo tồn rừng phòng hộ đầu nguồn dãy Trường Sơn.',
  },
  {
    id: 'dbs-cuu-long',
    regionName: 'Đồng bằng sông Cửu Long',
    badge: 'Vương quốc Thủy sản Quốc gia',
    forestAdvantage: 'Tỉ lệ che phủ thấp (6,0%) nhưng đặc sắc với hệ sinh thái rừng ngập mặn (đước Cà Mau) và rừng tràm U Minh chống xâm nhập mặn.',
    fisheryAdvantage: 'Đứng đầu cả nước cả về khai thác và nuôi trồng (>55% sản lượng thủy sản cả nước), trung tâm cá tra, cá basa và tôm sú, tôm thẻ chân trắng.',
    sustainablePolicy: 'Nhân rộng mô hình lúa - tôm, tôm - rừng ngập mặn sinh thái thích ứng biến đổi khí hậu và hạn mặn.',
  },
];

export const LESSON_SECTIONS: LessonSection[] = [
  {
    id: 0,
    slug: 'intro',
    title: 'Khởi động & Đặt vấn đề',
    shortTitle: 'Khởi động',
    category: 'intro',
    allocatedMinutes: 3,
    instruction: 'Quan sát tranh toàn cảnh, lắng nghe định hướng mục tiêu bài học và nắm chắc vai trò của kinh tế xanh lâm - thủy sản.',
    narrationText: 'Chào mừng các em học sinh đến với tiết học Địa lí 12 - Bài 13: Vấn đề phát triển ngành lâm nghiệp và thủy sản. Rừng vàng biển bạc là nguồn tài nguyên vô giá. Hãy cùng khám phá tiềm năng, chuỗi giá trị và giải pháp phát triển bền vững hai ngành kinh tế then chốt này!',
    questions: [],
  },
  {
    id: 1,
    slug: 'slide1',
    title: '1. Thế mạnh phát triển ngành lâm nghiệp & Phân hóa rừng',
    shortTitle: 'Slide 1: Phân hóa rừng',
    category: 'forestry',
    allocatedMinutes: 6,
    instruction: 'Quan sát Bảng 13.1 và bản đồ phân bố: So sánh diện tích và tỉ lệ che phủ rừng giữa các vùng lãnh thổ năm 2024.',
    narrationText: 'Năm 2024, cả nước có hơn 14,8 triệu héc-ta rừng, tỉ lệ che phủ đạt 42,02%. Tuy nhiên tài nguyên rừng phân hóa rất sâu sắc: Trung du miền núi Bắc Bộ có diện tích lớn nhất, nhưng Bắc Trung Bộ mới là vùng có tỉ lệ che phủ cao nhất đạt 57,6%. Đồng bằng sông Cửu Long có độ che phủ thấp nhất với 6%.',
    questions: [
      {
        id: 's1_q1',
        slideId: 1,
        type: 'true_false',
        prompt: 'Vùng Trung du và miền núi phía Bắc có diện tích rừng lớn nhất và tỉ lệ che phủ rừng cao nhất cả nước năm 2024.',
        correctAnswer: false,
        explanation: 'Sai! Vùng Trung du và miền núi Bắc Bộ có DIỆN TÍCH rừng lớn nhất (5.405,1 nghìn ha), nhưng TỈ LỆ CHE PHỦ rừng cao nhất nước thuộc về Bắc Trung Bộ (57,6%), trong khi TDMN phía Bắc là 54,7%.',
        pedagogicalNote: 'Học sinh hay nhầm lẫn giữa "diện tích tuyệt đối (nghìn ha)" và "tỉ lệ che phủ tương đối (%)". Bảng 13.1 SGK chỉ rõ: Bắc Trung Bộ đạt 57,6% dẫn đầu cả nước.',
        hint: 'Hãy so sánh cột Tỉ lệ che phủ giữa Bắc Trung Bộ (57,6%) và Trung du miền núi Bắc Bộ (54,7%).',
      },
      {
        id: 's1_q2',
        slideId: 1,
        type: 'true_false',
        prompt: 'Đồng bằng sông Cửu Long là vùng có diện tích rừng và tỉ lệ che phủ rừng thấp nhất nước do đặc thù địa hình ngập nước và sản xuất nông nghiệp.',
        correctAnswer: true,
        explanation: 'Đúng! Đồng bằng sông Cửu Long có diện tích rừng chỉ 245,0 nghìn ha và tỉ lệ che phủ thấp nhất cả nước (6,0%) do đất đai phần lớn được khai thác chuyên canh lúa nước, cây ăn trái và nuôi trồng thủy sản.',
        pedagogicalNote: 'Chuẩn xác theo SGK Kết nối tri thức. ĐBSCL chủ yếu có diện tích rừng ngập mặn ven biển (Cà Mau, Bạc Liêu) và rừng tràm ngập phèn (Kiên Giang, An Giang, Đồng Tháp).',
        hint: 'Xem thông số dòng cuối Bảng 13.1: ĐBSCL có tỉ lệ che phủ chỉ đạt 6,0%.',
      },
    ],
  },
  {
    id: 2,
    slug: 'slide2',
    title: '2. Hoạt động phát triển ngành lâm nghiệp',
    shortTitle: 'Slide 2: Hoạt động lâm nghiệp',
    category: 'forestry',
    allocatedMinutes: 5,
    instruction: 'Khám phá mô hình tương tác chuỗi giá trị khép kín từ khoanh nuôi, khai thác bền vững đến nhà máy chế biến gỗ xuất khẩu.',
    narrationText: 'Lâm nghiệp nước ta bao gồm 3 phân ngành: Lâm sinh, khai thác và chế biến lâm sản. Trong đó, trồng rừng, khoanh nuôi và bảo vệ là nền tảng sống còn. Công nghiệp chế biến phát triển mạnh mẽ tạo ra các sản phẩm xuất khẩu giá trị cao như gỗ xẻ, ván ép và đồ nội thất.',
    questions: [
      {
        id: 's2_q1',
        slideId: 2,
        type: 'mcq',
        prompt: 'Hoạt động giữ vai trò nền tảng để duy trì, mở rộng tài nguyên rừng và cung cấp nguyên liệu lâu dài cho công nghiệp chế biến là gì?',
        options: [
          { id: 'A', text: 'Trồng rừng, khoanh nuôi và bảo vệ rừng' },
          { id: 'B', text: 'Gia tăng khai thác triệt để các cánh rừng tự nhiên' },
          { id: 'C', text: 'Nhập khẩu 100% nguyên liệu gỗ từ nước ngoài' },
          { id: 'D', text: 'Xuất khẩu thô toàn bộ lượng gỗ khai thác hàng năm' },
        ],
        correctAnswer: 'A',
        explanation: 'Đáp án A: Trồng rừng, khoanh nuôi và bảo vệ rừng là hoạt động lâm sinh nền tảng. Hoạt động này đảm bảo duy trì độ che phủ, tái sinh trữ lượng và cung cấp nguồn gỗ nguyên liệu ổn định có chứng chỉ bền vững (FSC).',
        pedagogicalNote: 'SGK Địa lí 12 nhấn mạnh: Lâm sinh là khâu nền móng, vừa bảo tồn sinh thái vừa nuôi dưỡng chuỗi giá trị lâm sản.',
      },
      {
        id: 's2_q2',
        slideId: 2,
        type: 'mcq',
        prompt: 'Sản phẩm chủ yếu của ngành công nghiệp chế biến lâm sản nước ta hiện nay bao gồm những mặt hàng nào?',
        options: [
          { id: 'A', text: 'Gỗ xẻ, ván gỗ, đồ gỗ nội ngoại thất, ván ép và lâm sản ngoài gỗ' },
          { id: 'B', text: 'Chỉ sản xuất bột giấy và giấy viết thông thường' },
          { id: 'C', text: 'Chủ yếu là than củi và gỗ cành ngọn giá trị thấp' },
          { id: 'D', text: 'Chỉ xuất khẩu gỗ cây tròn chưa qua gia công cơ bản' },
        ],
        correctAnswer: 'A',
        explanation: 'Đáp án A: Ngành chế biến lâm sản Việt Nam hiện đứng top đầu thế giới với các mặt hàng phong phú: gỗ xẻ, ván băm, MDF, đồ nội thất cao cấp xuất khẩu sang Hoa Kỳ, EU, Nhật Bản, Hàn Quốc.',
        pedagogicalNote: 'Việt Nam là một trong những quốc gia xuất khẩu đồ gỗ lớn nhất thế giới, chuyển từ xuất khẩu thô sang tinh chế sâu.',
      },
    ],
  },
  {
    id: 3,
    slug: 'slide3',
    title: '3. Quản lí và bảo vệ tài nguyên rừng',
    shortTitle: 'Slide 3: Bảo vệ tài nguyên rừng',
    category: 'forestry',
    allocatedMinutes: 6,
    instruction: 'Kéo thanh trượt điều chỉnh "Tỉ lệ che phủ rừng đầu nguồn" trên mặt cắt lưu vực sông để kiểm chứng tác động sạt lở, xói mòn và ngập lụt.',
    narrationText: 'Bảo vệ rừng đầu nguồn là chìa khóa điều tiết nguồn nước, ngăn chặn lũ quét, sạt lở đất đá và xói mòn cho cả vùng hạ lưu. Thực hiện nghiêm chính sách giao đất giao rừng, phân loại 3 loại rừng rõ ràng và ứng dụng công nghệ viễn thám giám sát cháy rừng.',
    questions: [
      {
        id: 's3_q1',
        slideId: 3,
        type: 'mcq',
        prompt: 'Nguyên nhân chủ yếu làm suy giảm chất lượng rừng tự nhiên ở nước ta trong thời gian qua là:',
        options: [
          { id: 'A', text: 'Khai thác quá mức, đốt rừng làm nương rẫy và chuyển đổi mục đích kinh tế chưa hợp lí' },
          { id: 'B', text: 'Do thời tiết nhiệt đới ẩm gió mùa làm cây rụng lá' },
          { id: 'C', text: 'Do động vật hoang dã gặm nhấm làm chết thảm thực vật' },
          { id: 'D', text: 'Do diện tích trồng rừng mới lấn át toàn bộ rừng nguyên sinh' },
        ],
        correctAnswer: 'A',
        explanation: 'Đáp án A: Sự suy giảm chất lượng rừng chủ yếu do tác động tiêu cực của con người: khai thác lâm sản bừa bãi, du canh du cư đốt nương làm rẫy, chuyển đổi đất rừng sang cây công nghiệp hoặc thủy điện thiếu quy hoạch.',
        pedagogicalNote: 'SGK Địa lí 12 Kết nối tri thức - Mục Quản lí và bảo vệ rừng.',
      },
      {
        id: 's3_q2',
        slideId: 3,
        type: 'mcq',
        prompt: 'Vai trò quan trọng hàng đầu của việc bảo vệ rừng phòng hộ đầu nguồn là:',
        options: [
          { id: 'A', text: 'Bảo vệ đất và nước, điều hòa dòng chảy, hạn chế lũ lụt, xói mòn và sạt lở đất' },
          { id: 'B', text: 'Cung cấp tối đa sản lượng gỗ thương phẩm cho xuất khẩu' },
          { id: 'C', text: 'Mở rộng diện tích mặt bằng để xây dựng các khu đô thị mới' },
          { id: 'D', text: 'Phục vụ săn bắn động vật quý hiếm tự nhiên' },
        ],
        correctAnswer: 'A',
        explanation: 'Đáp án A: Rừng đầu nguồn giữ vai trò "lá chắn sinh thái": rễ cây đan kết giữ đất, thảm lá mục giữ nước ngầm, làm chậm đỉnh lũ, chống sạt lở đèo dốc và giảm bồi lắng lòng hồ thủy điện.',
        pedagogicalNote: 'Rừng phòng hộ đầu nguồn tuyệt đối không được khai thác vì mục đích thương mại làm mất tán rừng che phủ.',
      },
      {
        id: 's3_q3',
        slideId: 3,
        type: 'mcq',
        prompt: 'Giải pháp chiến lược lâu dài để quản lý và phát triển lâm nghiệp bền vững ở nước ta là:',
        options: [
          { id: 'A', text: 'Giao đất giao rừng, khoanh nuôi, trồng rừng kết hợp ứng dụng khoa học công nghệ quản lý' },
          { id: 'B', text: 'Cấm người dân hoàn toàn không được tiếp cận bất kỳ khu vực rừng nào' },
          { id: 'C', text: 'Chỉ tập trung vào công tác chữa cháy rừng sau khi xảy ra thảm họa' },
          { id: 'D', text: 'Chuyển toàn bộ rừng tự nhiên sang rừng trồng keo, tràm kinh tế' },
        ],
        correctAnswer: 'A',
        explanation: 'Đáp án A: Gắn quyền lợi người dân với việc giữ rừng thông qua giao đất giao rừng, kết hợp công nghệ định vị GPS, viễn thám cảnh báo sớm cháy rừng và dịch bệnh lâm nghiệp.',
        pedagogicalNote: 'Chính sách lâm nghiệp gắn cộng đồng dân cư bản địa với sinh kế bền vững.',
      },
      {
        id: 's3_q4',
        slideId: 3,
        type: 'mcq',
        prompt: 'Ý nghĩa to lớn của việc phát triển lâm nghiệp gắn liền với bảo vệ môi trường sinh thái là:',
        options: [
          { id: 'A', text: 'Đảm bảo sinh kế người dân, bảo tồn đa dạng sinh học và chủ động thích ứng biến đổi khí hậu' },
          { id: 'B', text: 'Tăng nhanh số lượng người di cư lên các vùng đồi núi tự do' },
          { id: 'C', text: 'Giúp chuyển đổi đất rừng thành đất canh tác nông nghiệp quy mô lớn' },
          { id: 'D', text: 'Thay thế hoàn toàn vai trò của các công trình đập thủy điện' },
        ],
        correctAnswer: 'A',
        explanation: 'Đáp án A: Rừng là bể hấp thụ các-bon (thị trường tín chỉ carbon), bảo vệ nguồn gen quý, đồng thời tạo việc làm, sinh kế ổn định xóa đói giảm nghèo cho đồng bào miền núi.',
        pedagogicalNote: 'Liên hệ mục tiêu Net Zero 2050 và cam kết bảo vệ rừng tại COP26.',
      },
    ],
  },
  {
    id: 4,
    slug: 'slide4',
    title: '4. Thế mạnh, hạn chế và ngư trường trọng điểm ngành thủy sản',
    shortTitle: 'Slide 4: Ngư trường thủy sản',
    category: 'fishery',
    allocatedMinutes: 7,
    instruction: 'Tương tác trên hải đồ biển Việt Nam: Click khám phá 4 ngư trường trọng điểm và các bãi tôm bãi cá chiến lược.',
    narrationText: 'Việt Nam có đường bờ biển dài 3260 km, vùng đặc quyền kinh tế hơn 1 triệu km vuông với hơn 2000 loài cá, 1600 loài giáp xác. Bốn ngư trường trọng điểm là: Hải Phòng - Quảng Ninh; Hoàng Sa - Trường Sa; Ninh Thuận - Bình Thuận - Bà Rịa - Vũng Tàu; Cà Mau - Kiên Giang. Định hướng then chốt là vươn khơi xa, chấm dứt khai thác IUU.',
    questions: [
      {
        id: 's4_q1',
        slideId: 4,
        type: 'mcq',
        prompt: 'Thế mạnh tự nhiên nổi bật nhất để phát triển ngành thủy sản ở nước ta là:',
        options: [
          { id: 'A', text: 'Đường bờ biển dài 3.260 km, vùng đặc quyền kinh tế rộng, nguồn lợi hải sản phong phú, nhiều vũng vịnh, đầm phá' },
          { id: 'B', text: 'Hệ thống sông ngòi đóng băng vào mùa đông thuận lợi bắt cá' },
          { id: 'C', text: 'Có diện tích hồ băng tích trên núi cao rộng lớn' },
          { id: 'D', text: 'Không bao giờ chịu ảnh hưởng của bão nhiệt đới và gió mùa' },
        ],
        correctAnswer: 'A',
        explanation: 'Đáp án A: Việt Nam có bờ biển 3.260 km, hơn 1 triệu km2 biển, nguồn sinh vật biển trù phú, cùng mạng lưới vũng vịnh đầm phá (như Tam Giang - Cầu Hai) rất lý tưởng cho nuôi trồng và đánh bắt.',
        pedagogicalNote: 'Kiến thức cốt lõi phần Điều kiện tự nhiên phát triển thủy sản trong SGK.',
      },
      {
        id: 's4_q2',
        slideId: 4,
        type: 'mcq',
        prompt: 'Ý nào sau đây KHÔNG PHẢI là hạn chế, khó khăn đối với sự phát triển ngành thủy sản nước ta?',
        options: [
          { id: 'A', text: 'Nước ta hoàn toàn không có các ngư trường trọng điểm ở vùng biển xa bờ' },
          { id: 'B', text: 'Mỗi năm trung bình chịu từ 9 - 10 cơn bão và áp thấp nhiệt đới trên biển' },
          { id: 'C', text: 'Cơ sở hạ tầng cảng cá, tàu thuyền và công nghệ bảo quản sau thu hoạch còn hạn chế' },
          { id: 'D', text: 'Nguồn lợi thủy sản vùng ven bờ có nguy cơ suy giảm do khai thác quá mức' },
        ],
        correctAnswer: 'A',
        explanation: 'Đáp án A là nhận định SAI (do đó là đáp án được chọn). Thực tế nước ta có các ngư trường xa bờ rất lớn như Hoàng Sa - Trường Sa, bãi ngầm Tư Chính.',
        pedagogicalNote: 'Cần đọc kỹ cụm từ phủ định "KHÔNG PHẢI là hạn chế".',
      },
      {
        id: 's4_q3',
        slideId: 4,
        type: 'mcq',
        prompt: 'Nước ta đã xác định bao nhiêu ngư trường trọng điểm có ý nghĩa chiến lược kinh tế - quốc phòng?',
        options: [
          { id: 'A', text: '4 ngư trường trọng điểm' },
          { id: 'B', text: '2 ngư trường duy nhất ở miền Bắc' },
          { id: 'C', text: '10 ngư trường phân bố riêng lẻ' },
          { id: 'D', text: 'Chỉ có 1 ngư trường tại vịnh Thái Lan' },
        ],
        correctAnswer: 'A',
        explanation: 'Đáp án A: 4 ngư trường lớn gồm: (1) Hải Phòng - Quảng Ninh; (2) Quần đảo Hoàng Sa, Trường Sa; (3) Ninh Thuận - Bình Thuận - Bà Rịa - Vũng Tàu; (4) Cà Mau - Kiên Giang.',
        pedagogicalNote: '4 ngư trường trọng điểm là kiến thức trọng tâm SGK lớp 12 luôn xuất hiện trong các đề thi tốt nghiệp THPT.',
      },
      {
        id: 's4_q4',
        slideId: 4,
        type: 'mcq',
        prompt: 'Định hướng quan trọng hàng đầu trong hoạt động khai thác thủy sản biển hiện nay của nước ta là:',
        options: [
          { id: 'A', text: 'Đẩy mạnh khai thác xa bờ có chọn lọc, hiện đại hóa tàu thuyền gắn với bảo vệ nguồn lợi và gỡ cảnh báo thẻ vàng IUU' },
          { id: 'B', text: 'Tập trung đánh bắt ven bờ bằng xung điện và chất nổ' },
          { id: 'C', text: 'Ngừng hoàn toàn mọi hoạt động đánh bắt hải sản trên biển' },
          { id: 'D', text: 'Chỉ đóng tàu gỗ nhỏ công suất dưới 20 mã lực' },
        ],
        correctAnswer: 'A',
        explanation: 'Đáp án A: Chuyển dịch tàu cá sang vùng biển khơi, lắp đặt thiết bị giám sát hành trình VMS, chấm dứt vi phạm vùng biển nước ngoài (IUU) để bảo vệ uy tín thủy sản Việt Nam.',
        pedagogicalNote: 'Chống khai thác hải sản bất hợp pháp, không báo cáo và không theo quy định (IUU) là nhiệm vụ trọng tâm quốc gia.',
      },
    ],
  },
  {
    id: 5,
    slug: 'slide5',
    title: '5. Chuyển dịch cơ cấu sản lượng thủy sản (2010 – 2024)',
    shortTitle: 'Slide 5: Cơ cấu sản lượng',
    category: 'fishery',
    allocatedMinutes: 6,
    instruction: 'Xem biểu đồ tăng trưởng và cơ cấu: Thực hành tính tốc độ tăng trưởng và phân tích sự vượt trội của nuôi trồng.',
    narrationText: 'Sản lượng thủy sản nước ta tăng liên tục từ 5,2 triệu tấn năm 2010 lên hơn 9,65 triệu tấn năm 2024, tăng trưởng tới 85,5%. Đặc biệt, cơ cấu chuyển dịch rõ nét: sản lượng nuôi trồng tăng vượt trội, từ 53,6% lên 58,9%, trở thành động lực tăng trưởng chính.',
    questions: [
      {
        id: 's5_q1',
        slideId: 5,
        type: 'calculation',
        prompt: 'Tính tốc độ tăng trưởng (%) tổng sản lượng thủy sản nước ta năm 2024 so với năm 2010 (Biết: Năm 2010 đạt 5.204,5 nghìn tấn; Năm 2024 đạt 9.656,3 nghìn tấn).',
        options: [
          { id: 'A', text: 'Tăng khoảng 85,5%' },
          { id: 'B', text: 'Tăng khoảng 45,2%' },
          { id: 'C', text: 'Tăng khoảng 185,5%' },
          { id: 'D', text: 'Tăng khoảng 62,3%' },
        ],
        correctAnswer: 'A',
        explanation: 'Đáp án A: Tốc độ tăng trưởng = [(9.656,3 - 5.204,5) / 5.204,5] × 100% = (4.451,8 / 5.204,5) × 100% ≈ 85,53% (Làm tròn 85,5%).',
        pedagogicalNote: 'Kỹ năng tính tốc độ tăng trưởng cơ bản trong Địa lí: Tăng trưởng (%) = [(Giá trị năm sau - Giá trị năm gốc) / Giá trị năm gốc] × 100%. (Hoặc lấy năm sau / năm gốc × 100% - 100%).',
        calculationContext: {
          formula: 'Tốc độ tăng = [(Sản lượng 2024 - Sản lượng 2010) / Sản lượng 2010] × 100%',
          stepByStep: '[(9.656,3 - 5.204,5) / 5.204,5] × 100% = 4.451,8 / 5.204,5 × 100% = 85,53% ≈ 85,5%',
          baseYearVal: 5204.5,
          targetYearVal: 9656.3,
        },
      },
      {
        id: 's5_q2',
        slideId: 5,
        type: 'mcq',
        prompt: 'Nhận xét và giải thích nào sau đây ĐÚNG NHẤT về sự chuyển dịch cơ cấu sản lượng giữa khai thác và nuôi trồng giai đoạn 2010 - 2024?',
        options: [
          { id: 'A', text: 'Tỉ trọng nuôi trồng tăng liên tục và vượt trội so với khai thác, do nguồn lợi ven bờ suy thoái, nhu cầu xuất khẩu tăng và công nghệ nuôi trồng tiến bộ' },
          { id: 'B', text: 'Khai thác tăng nhanh hơn nuôi trồng vì chi phí đi biển ngày càng rẻ' },
          { id: 'C', text: 'Cơ cấu ổn định tuyệt đối không có sự thay đổi nào' },
          { id: 'D', text: 'Sản lượng nuôi trồng giảm mạnh vì thiếu con giống sạch bệnh' },
        ],
        correctAnswer: 'A',
        explanation: 'Đáp án A: Tỉ trọng nuôi trồng tăng từ 53,6% (2010) lên 58,9% (2024). Đây là hướng đi tất yếu khi nguồn lợi biển tự nhiên cần được bảo vệ phục hồi, trong khi công nghệ nuôi thâm canh, siêu thâm canh công nghệ cao mang lại sản lượng ổn định.',
        pedagogicalNote: 'Chuyển đổi từ "khai thác tận diệt" sang "nuôi trồng công nghệ cao, chủ động nguyên liệu chế biến xuất khẩu".',
      },
    ],
  },
  {
    id: 6,
    slug: 'slide6',
    title: '6. Phân bố vùng và phát triển bền vững lâm nghiệp - thủy sản',
    shortTitle: 'Slide 6: Phân bố & Bền vững',
    category: 'fishery',
    allocatedMinutes: 5,
    instruction: 'Chọn so sánh 4 vùng lãnh thổ điển hình: Khám phá vai trò trụ cột của Đồng bằng sông Cửu Long và định hướng phát triển chuỗi giá trị bền vững.',
    narrationText: 'Mỗi vùng kinh tế đều có thế mạnh riêng biệt: Đồng bằng sông Cửu Long là vương quốc thủy sản cả nước cả về nuôi trồng và khai thác; Tây Nguyên và miền núi phía Bắc giữ vai trò pháo đài lâm nghiệp đầu nguồn. Phát triển bền vững đòi hỏi quản lý theo chuỗi giá trị và gắn kinh tế với bảo vệ hệ sinh thái.',
    questions: [
      {
        id: 's6_q1',
        slideId: 6,
        type: 'mcq',
        prompt: 'Vùng nào có thế mạnh lớn nhất cả nước về phát triển cả nuôi trồng và khai thác thủy sản với sản lượng đứng đầu toàn quốc?',
        options: [
          { id: 'A', text: 'Đồng bằng sông Cửu Long' },
          { id: 'B', text: 'Đồng bằng sông Hồng' },
          { id: 'C', text: 'Trung du và miền núi Bắc Bộ' },
          { id: 'D', text: 'Tây Nguyên' },
        ],
        correctAnswer: 'A',
        explanation: 'Đáp án A: Đồng bằng sông Cửu Long chiếm hơn 55% sản lượng thủy sản cả nước. Với mạng lưới sông rạch chằng chịt, bãi triều rừng ngập mặn rộng lớn, vùng dẫn đầu tuyệt đối về nuôi cá tra, tôm sú và khai thác hải sản ở ngư trường Cà Mau - Kiên Giang.',
        pedagogicalNote: 'Đồng bằng sông Cửu Long là trọng điểm số 1 về thủy sản của Việt Nam.',
      },
      {
        id: 's6_q2',
        slideId: 6,
        type: 'mcq',
        prompt: 'Nguyên tắc cốt lõi của việc phát triển kinh tế lâm nghiệp và thủy sản gắn với bảo vệ tài nguyên là gì?',
        options: [
          { id: 'A', text: 'Phát triển kinh tế đi đôi với bảo vệ môi trường sinh thái, bảo tồn nguồn lợi và quản lý bền vững theo chuỗi giá trị' },
          { id: 'B', text: 'Khai thác tối đa để đạt lợi nhuận kinh tế cao nhất trong ngắn hạn' },
          { id: 'C', text: 'Chỉ bảo tồn nghiêm ngặt mà không được phép khai thác hay chế biến lâm - thủy sản' },
          { id: 'D', text: 'Ưu tiên xuất khẩu nguyên liệu thô chưa qua chế biến để thu ngoại tệ nhanh' },
        ],
        correctAnswer: 'A',
        explanation: 'Đáp án A: Nguyên tắc phát triển bền vững là hài hòa giữa lợi ích kinh tế, công bằng xã hội (sinh kế ngư dân, lâm dân) và bảo vệ môi trường sinh thái lâu dài cho các thế hệ tương lai.',
        pedagogicalNote: 'Khái niệm "Phát triển bền vững" là sợi chỉ đỏ xuyên suốt chương trình Địa lí 12.',
      },
    ],
  },
  {
    id: 7,
    slug: 'summary',
    title: 'Củng cố, Tổng kết & Đánh giá kết quả',
    shortTitle: 'Tổng kết & Bảng điểm',
    category: 'summary',
    allocatedMinutes: 7,
    instruction: 'Xem tổng kết kết quả học tập, điểm số trắc nghiệm, nhận xét sư phạm và đánh giá mức độ đạt chuẩn năng lực Địa lí 12.',
    narrationText: 'Chúc mừng các em đã hoàn thành xuất sắc các nội dung học tập và bài tập của Bài 13. Hãy cùng rà soát lại bảng điểm cá nhân, đọc bản đánh giá năng lực và chuẩn bị cho bài học tiếp theo!',
    questions: [],
  },
];
