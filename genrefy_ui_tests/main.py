import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import requests
import time
import page
from bs4 import BeautifulSoup
from selenium.common.exceptions import TimeoutException, NoSuchElementException
from unittest import mock

class GenrefySearch(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome("C:\Program Files (x86)\chromedrive.exe")
        self.driver.get("http://localhost:4200")
    
    # def test_test(self):
    #     print("Test")
    #     assert True

    def test_login(self):
        # Test login functionality
        wait = WebDriverWait(self.driver, 10)  # Wait for a maximum of 10 seconds

        # Find and interact with email input field
        email_input =wait.until(EC.presence_of_element_located((By.ID, "login-username")))
        email_input.clear()
        email_input.send_keys("ietenjoyer@gmail.com")

        # Find and interact with password input field
        password_input = self.driver.find_element(By.ID, "login-password")
        password_input.clear()
        password_input.send_keys("IEThazi2023")

        # Find and click login button
        login_button = self.driver.find_element(By.ID, "login-button")
        login_button.click()

        ## Auth page for permissions
        # Wait for a specific element to be present or visible
        authorisation_button = wait.until(EC.presence_of_element_located((By.XPATH, "//button[@data-testid='auth-accept']")))
        authorisation_button.click()  # Click on the button

        # Wait for specific element to be clickable
        wait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/app-root/app-songs/mat-card/mat-card-content[1]/button[1]")))        
        songsPage=page.SongsPage(self.driver)
        assert songsPage.is_title_matches()
    
    def test_filter_button(self):
        # Test filter button functionality
        wait = WebDriverWait(self.driver, 10)  # Wait for a maximum of 10 seconds
        songsPage=page.SongsPage(self.driver)
        songsPage.sign_in()
        songsPage.click_filter_button()
        wait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/app-root/app-filters/mat-card/mat-card-actions/button[1]")))        
        filtersPage=page.FilterPage(self.driver)
        assert filtersPage.is_title_matches()

    def test_list_titles(self):
        # Test listing titles
        wait = WebDriverWait(self.driver, 10)  # Wait for a maximum of 10 seconds
        songsPage=page.SongsPage(self.driver)
        songsPage.sign_in()           
        # Find the list of elements
        title_element = wait.until(EC.presence_of_element_located((By.XPATH, "/html/body/app-root/app-songs/mat-card/mat-card-content[2]")))
        songs = self.driver.find_elements(By.CSS_SELECTOR, ".mat-mdc-card-title")
        for song in songs:
            if not song.is_displayed():
                raise AssertionError("Element is not visible")
            else: print(song.text)

    def test_list_artist(self):
        # Test listing artists
        wait = WebDriverWait(self.driver, 10)  # Wait for a maximum of 10 seconds
        songsPage=page.SongsPage(self.driver)
        songsPage.sign_in()           
        # Find the list of elements
        title_element = wait.until(EC.presence_of_element_located((By.XPATH, "/html/body/app-root/app-songs/mat-card/mat-card-content[2]")))
        artists = self.driver.find_elements(By.CSS_SELECTOR, ".song-artist")
        for artist in artists:
            if not artist.is_displayed():
                raise AssertionError("Element is not visible")
            else: print(artist.text)
            
    def test_save_playlist_dialog(self):
        # Test saving playlist dialog
        wait = WebDriverWait(self.driver, 10)  # Wait for a maximum of 10 seconds
        songsPage=page.SongsPage(self.driver)
        songsPage.sign_in()           
        # Find the list of elements        
        songsPage=page.SongsPage(self.driver)
        songsPage.click_playlist_button()                   
        # Dialog check
        button_locator = (By.CSS_SELECTOR, "button.mdc-button.mat-mdc-button.mat-unthemed.mat-mdc-button-base")

        try:
            wait.until(EC.visibility_of_element_located(button_locator))
            dialog = self.driver.find_element(By.XPATH, "//*[@id='mat-mdc-dialog-title-0']")
            if not dialog.is_displayed():
                raise AssertionError("Element is not visible")
        except (TimeoutException, NoSuchElementException):
            raise AssertionError("Element not found")         

    def test_save_playlist_cancel(self):
        # Test canceling saving playlist
        wait = WebDriverWait(self.driver, 10)  # Wait for a maximum of 10 seconds
        songsPage=page.SongsPage(self.driver)
        songsPage.sign_in()           
        # Find the list of elements        
        songsPage=page.SongsPage(self.driver)
        songsPage.click_playlist_button()                   
        # Dialog check
        button_locator = (By.XPATH, "//*[@id='mat-mdc-dialog-0']/div/div/app-playlist-name-dialog/mat-dialog-actions/button[1]")
        wait.until(EC.visibility_of_element_located(button_locator))
        dialog = self.driver.find_element(By.XPATH, "//*[@id='mat-mdc-dialog-title-0']")
        if not dialog.is_displayed():
            raise AssertionError("Element is not visible")
        cancel_button = self.driver.find_element(By.XPATH,"//*[@id='mat-mdc-dialog-0']/div/div/app-playlist-name-dialog/mat-dialog-actions/button[1]")
        cancel_button.click()
        # Wait until the cancel button is not visible
        wait.until(EC.invisibility_of_element_located(button_locator))
        try:
            # Try to find the cancel button again
            cancel_button = self.driver.find_element(By.XPATH, "//*[@id='mat-mdc-dialog-0']/div/div/app-playlist-name-dialog/mat-dialog-actions/button[1]")

            # Check if the cancel button is still visible
            if cancel_button.is_displayed():
                raise AssertionError("Element is still visible")
        except NoSuchElementException:
            # Handle the case when the cancel button is not found
            pass

    def test_save_playlist_request(self):
        # Test saving playlist request
        wait = WebDriverWait(self.driver, 10)  # Wait for a maximum of 10 seconds
        songsPage=page.SongsPage(self.driver)
        songsPage.sign_in()           
        # Find the list of elements        
        songsPage=page.SongsPage(self.driver)
        songsPage.click_playlist_button()                   
        # Dialog check
        button_locator = (By.XPATH, "//*[@id='mat-mdc-dialog-0']/div/div/app-playlist-name-dialog/mat-dialog-actions/button[2]")
        wait.until(EC.visibility_of_element_located(button_locator))
        playlist_button=self.driver.find_element(By.XPATH, "//*[@id='mat-mdc-dialog-0']/div/div/app-playlist-name-dialog/mat-dialog-actions/button[2]")
        # Assert that the playlist button is clickable
        assert playlist_button.is_enabled(), "Playlist button is not clickable"
        ##TODO

    def test_filter_selection(self):
        # Test filter selection
        wait = WebDriverWait(self.driver, 10)  # Wait for a maximum of 10 seconds
        songsPage=page.SongsPage(self.driver)
        songsPage.sign_in()
        songsPage.click_filter_button()
        wait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/app-root/app-filters/mat-card/mat-card-actions/button[1]")))        
        
        time.sleep(2)
        options = self.driver.find_elements(By.CSS_SELECTOR, "mat-chip-listbox mat-chip-option")
        for option in options:
            if not option.is_displayed() or not option.is_enabled():
                raise AssertionError("Option is not clickable")

        genres = [genre_element.text for genre_element in options]
        print(genres)

    def test_filter_selection_clickable(self):
        # Test clickable filter selection
        wait = WebDriverWait(self.driver, 10)  # Wait for a maximum of 10 seconds
        songsPage=page.SongsPage(self.driver)
        songsPage.sign_in()
        songsPage.click_filter_button()
        wait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/app-root/app-filters/mat-card/mat-card-actions/button[1]")))        
        
        time.sleep(2)
        options = self.driver.find_elements(By.CSS_SELECTOR, "mat-chip-listbox mat-chip-option")
        for option in options:
            if not option.is_displayed() or not option.is_enabled():
                raise AssertionError("Option is not clickable")    
            option.click()
            time.sleep(1)          
            ng_reflect_selected = option.get_attribute("ng-reflect-selected")
            if ng_reflect_selected == "true":
                print(f"{option.text} - ng-reflect-selected: {ng_reflect_selected}")
            else:
                raise AssertionError(f"Option {option.text} was not selected")
            option.click()
            time.sleep(1)          
            ng_reflect_selected = option.get_attribute("ng-reflect-selected")
            if ng_reflect_selected == "false":
                print(f"{option.text} - ng-reflect-selected: {ng_reflect_selected}")
            else:
                raise AssertionError(f"Option {option.text} was not selected")
            
    def test_filter_clear_button(self):
        # Test clear filter button
        wait = WebDriverWait(self.driver, 10)  # Wait for a maximum of 10 seconds
        songsPage=page.SongsPage(self.driver)
        songsPage.sign_in()
        songsPage.click_filter_button()
        wait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/app-root/app-filters/mat-card/mat-card-actions/button[1]")))        
        
        time.sleep(2)
        options = self.driver.find_elements(By.CSS_SELECTOR, "mat-chip-listbox mat-chip-option")
        for option in options:
            if not option.is_displayed() or not option.is_enabled():
                raise AssertionError("Option is not clickable")    
            option.click()
        clear_button=self.driver.find_element(By.XPATH,"/html/body/app-root/app-filters/mat-card/mat-card-actions/button[2]")
        clear_button.click()
        time.sleep(1)
        for option in options:        
            ng_reflect_selected = option.get_attribute("ng-reflect-selected")
            if not ng_reflect_selected == "false":
                raise AssertionError(f"Clear Button didn't work")

    def test_filter_show_button(self):
        wait = WebDriverWait(self.driver, 10)  # Wait for a maximum of 10 seconds
        songsPage=page.SongsPage(self.driver)
        songsPage.sign_in()
        songsPage.click_filter_button()
        wait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/app-root/app-filters/mat-card/mat-card-actions/button[1]")))        
        
        time.sleep(2)
        show_button=self.driver.find_element(By.XPATH,"/html/body/app-root/app-filters/mat-card/mat-card-actions/button[1]")
        show_button.click()
        wait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/app-root/app-songs/mat-card/mat-card-content[1]/button[1]")))        
        songsPage=page.SongsPage(self.driver)
        assert songsPage.is_title_matches() 

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
