import locator
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

class BasePage(object):  
    def __init__(self,driver):
        self.driver=driver


class SongsPage(BasePage):
    def __init__(self, driver):
        super().__init__(driver)

    def sign_in(self):
        wait = WebDriverWait(self.driver, 10)  # Wait for a maximum of 10 seconds

        email_input =wait.until(EC.presence_of_element_located((By.ID, "login-username")))
        email_input.clear()
        email_input.send_keys("ietenjoyer@gmail.com")

        password_input = self.driver.find_element(By.ID, "login-password")
        password_input.clear()  # Clear any existing value in the input field
        password_input.send_keys("IEThazi2023")

        login_button = self.driver.find_element(By.ID,"login-button")
        login_button.click()

        ## Auth page for permissions
        # Wait for a specific element to be present or visible
        authorisation_button = wait.until(EC.presence_of_element_located((By.XPATH, "//button[@data-testid='auth-accept']")))
        # Or wait for the page title to contain a specific text
        authorisation_button.click()  # Click on the button
        #filter_button = wait.until(EC.presence_of_element_located((By.XPATH, "/html/body/app-root/app-songs/mat-card/mat-card-content[1]/button[1]")))
        wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/app-root/app-songs/mat-card/mat-card-content[1]/button[1]")))



    def is_title_matches(self):
        return "songs" in self.driver.current_url
    
    def click_filter_button(self):
        wait = WebDriverWait(self.driver, 10)  # Wait for a maximum of 10 seconds
        wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/app-root/app-songs/mat-card/mat-card-content[1]/button[1]")))
        # Scroll the page to bring the button into view
        element = self.driver.find_element(*locator.SongsPageLocators.filter_button)
        self.driver.execute_script("arguments[0].scrollIntoView(true);", element)

        # Click the button
        element.click()

    def click_playlist_button(self):
        wait = WebDriverWait(self.driver, 10)  # Wait for a maximum of 10 seconds
        wait.until(EC.element_to_be_clickable((By.XPATH,"/html/body/app-root/app-songs/mat-card/mat-card-content[1]/button[2]")))
        # Scroll the page to bring the button into view
        element = self.driver.find_element(By.XPATH,"/html/body/app-root/app-songs/mat-card/mat-card-content[1]/button[2]")

        # Click the button
        element.click()
        
    
class FilterPage(BasePage):
    def __init__(self, driver):
        super().__init__(driver)

    def is_title_matches(self):
        return "filters" in self.driver.current_url
    