import React from 'react';
import {
    AppBar,
    Box,
    Container,
    Toolbar,
    Typography,
    Link,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText, DialogActions, Button
} from '@mui/material';

// Import Alert
import {SwalAlert, SwalAlertCallBack, SwalConfirm} from "../../components/Common/SwalAlert";
import axios from "../../api/axiosConfig";

function Footer() {
    const [openTermsDialog, setOpenTermsDialog] = React.useState(false);
    const [openPrivacyDialog, setOpenPrivacyDialog] = React.useState(false);


    // 페이지 준비중 문구
    const handleDeleteAccount = () => {
        // 로그인 여부 확인
        // TODO: redux로 변경
        if (localStorage.getItem('user')) {
            SwalConfirm('warning', '회원탈퇴', '정말로 탈퇴하시겠습니까?', {}, async () => {
                // 회원 탈퇴 로직
                try {
                    const user = JSON.parse(localStorage.getItem('user') || '{}');

                    // 여기에 실제 회원 탈퇴를 처리하는 API 요청을 넣습니다.
                    const response = await axios.post('/api/user/delete', { userId: user.id });

                    // 회원 탈퇴 성공 시
                    if (response.data.success) {
                        SwalAlertCallBack('success', '회원 탈퇴', '회원 탈퇴가 완료되었습니다.', () => {
                            localStorage.removeItem('user');
                            window.location.href = '/';
                        });
                    }
                } catch (error) {
                    console.error('회원 탈퇴 처리 중 오류 발생:', error);
                }
            });
        } else {
            SwalAlert('warning', '로그인', '로그인이 이후 이용 가능합니다.');
        }
    };

    return (
        <React.Fragment>
            <AppBar position="static"
                    sx={{
                        height: '110px',
                        backgroundColor: 'rgb(25, 25, 30)',
                        boxShadow: 'none',
                    }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{
                        height: '110px',
                        verticalAlign: 'center',
                        justifyContent: 'space-between',
                        margin: '0 auto',
                    }}>
                        {/* 로고 */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    maxWidth: '175px',
                                }}
                            >
                                <img
                                    src={`${process.env.PUBLIC_URL}/logo/horizon_logo2.png`}
                                    alt="horizon-logo"
                                    style={{ width: '100%' }}
                                />
                            </Typography>
                        </Box>

                        {/* 대표자 정보 */}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-end',
                                color: 'white',
                                paddingRight: '20px',
                            }}
                        >
                            <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
                                대표자: 채형진<br />
                                전화번호: 010-5503-8718
                            </Typography>
                        </Box>

                        {/* 링크 */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Link  color="inherit" sx={{ paddingRight: '20px', cursor: 'pointer' }} onClick={() => setOpenTermsDialog(true)}>이용약관</Link>
                            <Link  color="inherit" sx={{ paddingRight: '20px', cursor: 'pointer' }} onClick={() => setOpenPrivacyDialog(true)}>개인정보 처리방침</Link>
                            <Link  color="inherit" sx={{ cursor: 'pointer' }} onClick={handleDeleteAccount}>회원탈퇴</Link>
                        </Box>
                    </Toolbar>

                    {/* 이용약관, 개인정보 처리방침 다이얼로그 */}
                    <Dialog open={openTermsDialog} onClose={() => setOpenTermsDialog(false)}>
                        <DialogTitle>샘플비 이용약관</DialogTitle>
                        <DialogContent>
                            <DialogContentText sx={{fontSize: '14px', color: 'gray'}}>
                                제1장 총 칙<br />
                                제1조 [목적]<br />
                                이 약관은 샘플비 회사가 운영하는 온라인샘플쇼핑몰에서 제공하는 전자상거래 관련 서비스(이하”서비스”라 함)를 이용함에 있어 샘플비와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.<br />
                                *PC통신, 스마트폰 앱, 무선 등을 이용하는 전자상거래에 대해서도 그 성질에 반하지 않는 한 이 약관을 준용합니다.<br />
                                제2조 [정의]<br />
                                1.”사이버몰”이란 샘플비가 상품 또는 용약(이하 “상품 등”이라 함)을 이용자에게 제공하기 위하여 컴퓨터 wemd 정보통신설비를 이용하여 상품 등을 거래할 수 있도록 설정한 가상의 영업장(???? 등 샘플비가 운영하는 웹사이트 등 모두 포함)을 말합니다.<br />
                                2.”이용자”란 샘플비에 접속하여 이 약관에 따라 샘플비가 제공하는 서비스를 이용하는 고객을 말합니다.<br />
                                3.”회원”이란 샘플비에 회원등록을 한 자로서, 계속적으로 샘플비가 제공하는 서비스를 이용할 수 있는 자들을 말합니다.<br />
                                4.”판매자”란 샘플비에 판매회원으로 회원등록을 하고 샘플비가 제공하는 통신판매중개서비스를 통하여 샘플을 판매하는 자로서 판매자용 이용약관에 동의하고 샘플비의 서비스 이용계약을 체결한 자를 말합니다.<br />
                                제3조 [약관 등의 명시와 설명 및 개정]<br />
                                ① 샘플비는 이 약관의 내용과 상호 및 대표자 성명, 전화번호, 등을 이용자가 쉽게 알 수 있도록 사이버몰의 초기 서비스화면(전면)의 하단에 게시합니다. 다만, 약관의 내용은 이용자가 연결화면을 통하여 볼 수 있도록 할 수 있습니다.<br />
                                ② 샘플비는 필요한 경우 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.<br />
                                ③ 샘플비가 이 약관을 개정할 경우에는 적용일자 및 개정 내용을 명시하여 사이버몰에 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리하게 약관내용을 변경하는 경우에는 최소한 30일 이상의 사전 유예 기간을 두고 공지 및 개별 통지합니다.<br />
                                ④ 전항에 따라 공지된 적용일자까지 이용자가 명시적으로 거부의사를 표명하지 않을 경우에는 개정된 약관에 동의하는 것으로 간주하며, 변경된 약관에 동의하지 않는 회원은 회원 탈퇴를 요청할 수 있습니다.<br />
                                ⑤ 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 전자상거래 등에서의 소비자보호에 관한 법률(이하 “전자상거래법”이라 함), 약관의 규제 등에 관한 법률 공정거래위원회가 정하는 전자상거래 등에서의 소비자 보호지침 및 관계법령 또는 상관례에 따릅니다.<br />
                                ⑥ 샘플비는 이 약관에 규정되지 않은 세부적인 운영정책, 이용약관, 규칙, 지침 및 서비스 이용과 관련된 전반적인 내용(이하 총칭하여 “운영정책’이라 함)을 제정하여 운영할 수 있으며, 해당 내용을 사이버몰에 게시합니다. 운영정책은 이 약관과 더불어 고객 서비스 이용계약(이하 “이용계약”이라 함)의 일부를 구성합니다.<br />
                                ⑦ 샘플비는 샘플비가 제공하는 서비스 중 특정 서비스에 관한 약관(이하 “개별약관”이라 함)을 별도로 제정할 수 있으며, 이용자가 개별약관에 동의한 경우 개별약관은 이용계약의 일부를 구성하고 개별약관에 이 약관과 상충되는 내용이 있을 경우 개별약관이 우선적으로 적용됩니다.<br />
                                제2장 회사의 서비스<br />
                                제4조 [서비스의 제공 및 변경]<br />
                                ① 샘플비는 다음과 같은 업무를 수행합니다.<br />
                                1. 전자상거래 서비스(통신판매중개 서비스 포함) 및 이에 수반되는 기타 서비스<br />
                                2. 기타 샘플비가 정하는 업무<br />
                                제5조 [서비스의 중단]<br />
                                ① 샘플비는 컴퓨터 등 정보통신설비의 보수점검/교체 및 고장, 통신의 두절, 정식 버전 출시 목적의 중단 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.<br />
                                ② 사업종목의 전환, 사업의 포기, 업체 간의 통합 등의 이유로 서비스를 제공할 수 없게 되는 경우에는 이용자에게 통지하고 당초 샘플비에서 제시한 조건에 따라 보상합니다.<br />
                                제3장 회원가입 계약<br />
                                제6조 [회원가입]<br />
                                ① 이용자는 샘플비가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.<br />
                                ② 샘플비는 전항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.<br />
                                1. 가입신청자가 이 약관 제 7조에 의하여 이전에 회원자격을 상실한 적이 있는 경우, 다만 제7조에 의한 회원자격 상실 후 3년이 경과한 자로서 샘플비의 회원재가입 승낙을 얻은 경우에는 예외로 합니다.<br />
                                2. 회원의 요청에 의하여 탈퇴한 때로부터 1개월이 지나지 아니한 경우<br />
                                3. 가입신청자가 기입한 등록 내용에 허위, 기재 누락 또는 오기가 있는 경우<br />
                                4. 가입신청자가 만 14세 미만인 경우<br />
                                5. 기타 회원으로 등록하는 것이 샘플비의 기술상 또는 서비스 운영 관점에서 현저히 지장이 있거나 부적절하다고 판단되는 경우<br />
                                ③ 회원가입계약의 성립 시기는 샘플비의 승낙이 회원에게 도달한 시점으로 합니다.<br />
                                ④ 회원은 회원가입 시 등록한 사항에 변경이 있는 경우, 상당한 기간 이내에 샘플비에 대하여 회원정보 수정 등의 방법으로 그 변경사항을 알려야 하며, 변경을 하지 아니하여 발생하는 불이익은 회원이 부담합니다.<br />
                                제 7조 [회원 탈퇴 및 자격 상실 등]<br />
                                ① 회원은 샘플비에 언제든지 탈퇴를 요청할 수 있으며 샘플비는 회원의 요청을 받을 경우 사이버물 혹은 전화번호의 메시지를 통하여 샘플비가 고지한 방법에 따라 신속하게 회원 탈퇴를 처리합니다. 단, 회원이 샘플비에 대한 채무를 부담하고 있는 경우, 회원과 샘플비 간 진행중인 거래가 있을 경우, 또는 회원의 부정행위가 합리적으로 의심되어 조사가 필요한 경우에는 탈퇴가 제한될 수 있으며, 이러한 사유가 해소되는대로 신속히 탈퇴를 처리합니다.<br />
                                ② 회원은 다음 각 호의 어느 하나의 사유에 해당하는 행위를 하여서는 안됩니다. 회원이 다음 각 호의 어느 하나의 사유에 해당하는 경우, 샘플비는 회원 자격을 제한, 정지 또는 상실시킬 수 있습니다. 회원 자격이 상실된 경우, 재가입이 제한됩니다.<br />
                                1. 가입 신청 시에 타인의 정보 또는 허위의 정보를 입력하거나 기입 내용에 정보의 누락, 오기가 있는 경우<br />
                                2. 샘플비를 이용하여 구입한 상품 등의 대금, 기타 샘플비 이용과 관련하여 회원이 부담하는 채무를 기일에 지급하지 않는 경우<br />
                                3. 다름 사람의 샘플비 이용을 방해하거나 그 정보를 도용하는 등 건전한 거래 질서를 위협하는 경우<br />
                                4. 샘플비를 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우<br />
                                5. 컬리가 제공하는 서비스 이용방법을 따르지 않고 비정상적인 방법으로 서비스를 이용하거나 사이버몰 등 일체의 시스템에 접속 또는 접근을 시도하는 경우<br />
                                6. 기타 다음과 같은 행위를 통해 샘플비의 건전한 운영을 해하거나 샘플비의 업무를 방해하는 경우<br />
                                가. 샘플비의 운영과 관련하여 근거 없는 사실 또는 허위의 사실을 적시하거나 유포하여 샘플비의 명예를 실추시키거나 샘플비의 신뢰도를 해하는 경우<br />
                                나. 샘플비의 이용과정에서 직원에게 폭언, 협박 또는 음란한 언행, 이에 준하는 행동 등으로 샘플비의 운영을 방해하는 경우<br />
                                다. 샘플비를 통하여 상품 등을 구매한 후 샘플비의 책임 없는 사유로 상습 또는 반복적으로 취소 및 반품하거나 이의를 제기하는 등으로 샘플비의 업무를 방해하는 경우<br />
                                라. 샘플비가 본인 확인 절차를 실시할 경우 본인 확인되지 않거나 본인이 아님이 확인된 경우<br />
                                마. 이미 가입된 샘플비의 회원과 개인정보(이름, 전화번호, 이메일 등)가 동일하거나, 여러 정보/사정을 종합하여 볼 때 동일인으로 합리적으로 인정되는 기존 회원이 중복 가입한 경우<br />
                                바. 동일/유사한 ID, 전화번호, 주소 등의 회원정보를 통하여 부정한 사용을 하는 것으로 의심되는 경우<br />
                                사. 매크로, 다수 생성 ID 사용, 크롤링 등 부정한 방법을 통해 서비스를 이용(어뷰징)하는 경우<br />
                                아. 샘플비로부터 서비스 제한, 회원 자격 정지 조치 등을 받은 회원이 그 조치기간 중에 이용계약을 임의해지하고 재회원가입 등을 통해 서비스를 이용하는 경우<br />
                                자. 무단으로 샘플비에 대한 정보, 사이버몰에 게시된 콘텐츠 등 자료를 수집하여 외부에 제출, 게시, 유용하는 등으로 샘플비의 저작권, 상표권 등 지식재산권을 비롯한 샘플비의 권리를 침해하는 경우<br />
                                차. 개별 상품 등 또는 이벤트 등과 관련하여 사전 고지된 정책이나 거래 조건을 위계 기타 부정한 방법으로 회피하여 건전한 거래질서를 해하는 경우<br />
                                ③ 회원이 전항의 어느 하나에 해당하는 경우, 샘플비는 별도의 사전 통지 없이 회원에게 기존에 제공한 혜택을 회수하거나 서비스 이용 제한의 조치를 취할 수 있습니다. 또한, 샘플비가 회원에 대하여 보유하는 채권(손해배상 등)이 있을 경우 회원에 대한 채무와 상계할 수 있습니다.<br />
                                ④ 샘플비가 회원 자격을 상실시키는 경우에는 회원 등록을 말소합니다. 이 경우 회원에게 이를 통지하고, 회원 등록 말소 전에 최소한 30일 이상의 기간을 정하여 소명할 기회를 부여합니다.<br />
                                제 8조 [회원에 대한 통지]<br />
                                ① 샘플비가 회원에 대한 통지를 하는 경우, 회원이 샘플비와 미리 약정하여 지정한 전자우편, 문자, 전화 등의 방법으로 할 수 있습니다.<br />
                                ② 샘플비는 불특정다수 회원에 대한 통지의 경우 7일 이상 사이버몰에 게시함으로써 개별 통지에 갈음할 수 있습니다. 다만, 회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 개별 통지합니다.<br />
                                <br />
                                제4장 계약 당사자의 의무<br />
                                제 9조 [개인정보보호]<br />
                                ① 샘플비는 이용자의 개인정보 수집시 서비스 제공을 위하여 필요한 범위에서 최소한의 개입정보를 수집합니다.<br />
                                ② 샘플비는 회원가입시 구매계약이행에 필요한 정보를 미리 수집하지 않습니다. 다만, 관련 법령상 의무이행을 위하여 구매계약 이전에 본인확인이 필요한 경우로서 최소한의 특정 개인정보를 수집하는 경우에는 그러하지 아니합니다.<br />
                                ③ 샘플비는 이용자의 개인정보를 수집/이용하는 때에는 당해 이용자에게 그 목적을 고지하고 동의를 받습니다.<br />
                                ④ 샘플비는 수집된 개인정보를 목적 외의 용도로 이용할 수 없으며, 새로운 이용 목적이 발생한 경우 또는 제 3자에게 제공하는 경우에는 이용/제공단계에서 당해 이용자에게 그 목적을 고지하고 동의를 받습니다. 다만, 관련 법령에 달리 정함이 있는 경우에는 예외로 합니다.<br />
                                ⑤ 샘플비가 제 2항과 제 3항에 의해 이용자의 동의를 받아야 하는 경우에는 개인정보 보호책임자의 신원(성명 및 전화번호), 정보의 수집목적 및 이용목적, 제3자에 대한 정보제공 관련사항(제공받은자, 제공목적 및 제공할 정보의 내용) 등 개인정보보호법 제39조의3이 규정한 사항을 미리 명시하거나 고지해야 하며 이용자는 언제든지 이 동의를 철회할 수 있습니다.<br />
                                ⑥ 이용자는 언제든지 샘플비가 가지고 있는 자신의 개인정보에 대해 열람 및 오류정정을 요구할 수 있으며 샘플비는 이에 대해 지체 없이 필요한 조치를 취할 의무를 집니다. 이용자가 오류의 정정을 요구한 경우에는 샘플비는 그 오류를 정정할 때까지 당해 개인정보를 이용하지 않습니다.<br />
                                ⑦ 샘플비는 개인정보 보호를 위하여 이용자의 개인정보를 취급하는 자를 최소한으로 제한한다.<br />
                                ⑧ 샘플비 또는 그로부터 개인정보를 제공받은 제3자는 개인정보의 수집목적 또는 제공받은 목적을 달성한 때에는 당해 개인정보를 지체 없이 파기합니다.<br />
                                ⑨ 샘플비는 개인정보의 수집/이용/제공에 관한 동의란을 미리 선택한 것으로 설정해두지 않습니다. 또한 개인정보의 수집/이용/제공에 관한 이용자의 동의거절시 제한되는 서비스를 구체적으로 명시하고, 필수수집항목이 아닌 개인정보의 수집/이용/제공에 관한 이용자의 동의 거절을 이유로 회원가입 등 서비스 제공을 제한하거나 거절하지 않습니다.<br />
                                제 10조 [샘플비의 의무]<br />
                                ① 샘플비는 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 이 약관이 정하는 바에 따라 지속적이고, 안정적으로 상품 등 제공하기 위하여 최선을 다하여야 합니다.<br />
                                ② 샘플비는 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 이용자의 개인정보(신용정보 포함)보호를 위한 보안 시스템을 갖추어야 합니다.<br />
                                ③ 샘플비가 상품이나 용역에 대하여 표시 및 광고의 공정화에 관한 법률 제3조 소정의 부당한 표시/광고행위를 함으로써 이용자가 손해를 입은 때에는 이를 배상할 책임을 집니다.<br />
                                ④ 샘플비는 이용자가 동의하지 않은 영리목적의 광고성 전자우편을 발송하지 않습니다.<br />
                                제 11조 [회원의 ID 및 비밀번호에 대한 의무]<br />
                                ① ID와 비밀번호에 관한 관리책임은 회원에게 있습니다.<br />
                                ② 회원은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는 안됩니다.<br />
                                ③ 회원이 자신의 ID 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을 인지한 경우에는 바로 샘플비에게 통보하고 샘플비의 안내가 있는 경우에는 그에 따라야 합니다.<br />
                                제5장 기타<br />
                                제 12조 [이용자의 의무]<br />
                                이용자는 다음 행위를 하여서는 안 됩니다.<br />
                                1. 회원등록 신청 또는 변경시 허위 내용의 등록<br />
                                2. 타인의 정보 도용<br />
                                3. 샘플비에 게시된 정보의 변경<br />
                                4. 샘플비가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시<br />
                                5. 샘플비 기타 제3자의 저작권 등 지식재산권에 대한 침해<br />
                                6. 샘플비 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위<br />
                                7. 외설 또는 폭력적인 메시지,화상,음성,기타 공서양속에 반하는 정보를 사이버몰에 공개 또는 게시하는 행위<br />
                                8. 회원이 샘플비가 제공하는 서비스를 이용하지 아니하고 판매자와 직접 거래하는 행위(이하 “직거래”라 함) 또는 이를 유도하는 행위<br />
                                9. 샘플비 또는 판매자의 판매 활동을 방해하거나 샘플비를 이용하여 부당한 이득을 취하는 등 통상적인 전자상거래 관행에 부합하지 않는 거래상의 부정 행위<br />
                                제 13조 [지식재산권]<br />
                                ① 샘플비가 작성한 콘텐츠, 상품페이지(사진 포함)를 비롯한 일체의 저작물에 대한 저작권 기타 지식재산권은 샘플비가 보유하며, 회원이 등록 또는 게시한 상품 후기, 콘텐츠 등 게시물(이하 “게시물”이라 함)에 대한 저작권 기타 지식재산권은 회원이 보유합니다.<br />
                                ② 이용자는 샘플비의 서비스를 이용하는 과정에서 얻은 정보나 자료 중 샘플비에게 지식재산권이 귀속된 정보나 자료를 샘플비의 사전 승낙 없이 복제,송신,출판,배포,방송 기타 방법에 의하여 다른 목적(특히 영리 목적)으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.<br />
                                ③ 샘플비는 회원과 타인의 지식재산권이 서로 존중되고 보호받을 수 있도록 노력할 책임이 있고, 특히 타인에 의해 회원의 지식재산권 침해가 확인될 경우 즉시 회원의 권리 보호를 위하여 필요한 조치를 취하고 이를 회원에게 통지하는 등 회원이 게시한 게시물의 보호를 위하여 최선을 다합니다.<br />
                                1.서비스 내에서 게시물을 사용하거나, 서비스를 홍보 또는 마케팅하기 위한 목적으로 인터넷,모바일,SNS를 포함한 온 오프라인 채널을 통해 게시물의 내용을 보도, 방영하는 경우<br />
                                2. 게시물을 복제 전송 전시하는 방법으로 제휴서비스에서 게시물을 제공하는 경우<br />
                                제 14조 [면책조항]<br />
                                ① 샘플비는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.<br />
                                ② 샘플비는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.<br />
                                ③ 샘플비는 이용자가 서비스를 이용하여 기대하는 수익을 얻지 못하거나 상실한 것에 대하여 책임을 지지 않으며, 그 밖의 서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.<br />


                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenTermsDialog(false)}>확인</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={openPrivacyDialog} onClose={() => setOpenPrivacyDialog(false)}>
                        <DialogTitle>샘플비 개인정보 처리방침</DialogTitle>
                        <DialogContent>
                            <DialogContentText sx={{fontSize: '14px', color: 'gray'}}>
                                본 방침은 2024년 1월 31일부터 시행됩니다.<br />
                                <br />
                                최초 개인정보처리방침 시행일: 2024년 1월 31일<br />
                                <br />
                                Samplebee(이하 ‘플랫폼’)는 이용자의 개인정보 보호를 매우 중요시하며, 이용자의 개인정보 보호를 위해 항상 최선을 다하고 있습니다. Samplebee는 개인정보 보호 관련 법령을 준수하며, 개인정보 처리방침을 통해 이용자가 제공하는 개인정보의 사용 목적과 방식, 개인정보 보호를 위한 조치에 대해 안내합니다. 본 개인정보 처리방침은 법령 변경이나 내부 방침에 따라 변경될 수 있으므로, 사이트 이용 시 정기적으로 확인해 주시기 바랍니다.<br />
                                <br />
                                제 1조. 개인정보의 수집 항목 및 방법<br />
                                필수 항목: 이메일(아이디), 비밀번호, 전화번호, 직업, 성명<br />
                                서비스 이용 과정에서 자동으로 수집될 수 있는 정보: 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보 등<br />
                                제 2조. 개인정보의 수집 및 이용 목적<br />
                                서비스 제공 및 이용에 따른 계약 이행, 요금 정산<br />
                                신규 서비스 개발, 마케팅 및 광고에 활용<br />
                                고객 문의 및 불만 처리, 통계 분석 및 서비스 개선<br />
                                제 3조. 개인정보의 공유 및 제공<br />
                                Samplebee는 이용자의 개인정보를 ‘제 2조 개인정보의 수집 및 이용 목적’에서 고지한 범위 내에서만 사용하며, 이용자의 사전 동의 없이 외부에 공개하지 않습니다.<br />
                                법령에 의거하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우에 한해 개인정보를 제공할 수 있습니다.<br />
                                제 4조. 개인정보의 보유 및 이용 기간<br />
                                원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.<br />
                                관련 법령에 의해 보존할 필요성이 있는 경우 일정 기간 동안 개인정보를 보관합니다.<br />
                                제 5조. 개인정보 파기 절차 및 방법<br />
                                파기 절차: 이용 목적이 달성된 개인정보는 내부 방침 및 관련 법령에 따라 일정 기간 저장된 후 파기됩니다.<br />
                                파기 방법: 종이 문서는 분쇄기로 분쇄, 전자적 파일 형태는 기술적 방법을 사용하여 삭제합니다.<br />
                                제 6조. 개인정보 보호책임자<br />
                                Samplebee는 이용자의 개인정보 보호를 위해 개인정보 보호책임자를 지정하고 있습니다. 개인정보와 관련한 문의사항이 있을 경우 아래 연락처로 문의하시기 바랍니다.<br />
                                <br />
                                개인정보 보호책임자: [김재현], [한살터울 공동대표]<br />
                                연락처: [01064101534], [kjh12027@naver.com]<br />
                                제 7조. 개인정보의 안전성 확보 조치<br />
                                Samplebee는 이용자의 개인정보가 분실, 도난, 유출, 변조 또는 훼손되지 않도록 안전성 확보를 위해 다음과 같은 기술적, 관리적 대책을 강구하고 있습니다.<br />
                                <br />
                                비밀번호 암호화<br />
                                해킹 및 바이러스 방지를 위한 기술적 대책<br />
                                개인정보 처리 직원의 최소화 및 정기적 교육<br />
                                제 8조. 개인정보 처리방침 변경<br />
                                본 개인정보 처리방침은 법령, 정책 및 보안기술의 변경에 따라 내용의 추가, 삭제 및 수정이 있을 수 있으며, 변경될 경우 Samplebee는 변경 사항을 플랫폼의 공지사항을 통해 사전에 공지할 것입니다.<br />

                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenPrivacyDialog(false)}>닫기</Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </AppBar>
        </React.Fragment>
    );
}

export default Footer;
