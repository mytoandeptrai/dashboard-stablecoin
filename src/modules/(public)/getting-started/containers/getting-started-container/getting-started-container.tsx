import { CookiesConsentDialogUi } from '../../components/cookies-consent-dialog-ui';
import { UserInfoDialogUi } from '../../components/user-info-dialog-ui';
import { useGettingStartedContainer } from '../../hooks';

const GettingStartedContainer = () => {
  const { cookiesConsent, userInfoForm } = useGettingStartedContainer();

  return (
    <div className='flex min-h-screen items-center justify-center bg-muted/50'>
      {/* Cookies Consent Dialog */}
      <CookiesConsentDialogUi
        isOpen={cookiesConsent.showCookiesDialog}
        onAccept={cookiesConsent.handleAccept}
        onDecline={cookiesConsent.handleDecline}
      />

      {/* User Info Dialog */}
      <UserInfoDialogUi
        isOpen={userInfoForm.showUserInfoDialog}
        form={userInfoForm.form}
        isValid={userInfoForm.isValid}
        isSubmitting={userInfoForm.isSubmitting}
        onSubmit={userInfoForm.handleSubmit}
        onCancel={userInfoForm.handleCancel}
      />
    </div>
  );
};

export default GettingStartedContainer;
